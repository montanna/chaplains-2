/* generic report generator using DataTables */

var reportFunctions = (function() {

    console.log("loaded reportFunctions");

    $("body").append("<input class='tableCellEditor' placeholder='value'/> ")
    $(".tableCellEditor").hide();

    var self = {};
    var authenticatedUser = {};

    var table;
    var isEditing = false;

    var attributeEditing = '';
    var newValue = ''

    var target;

    // generic URL parameter parser.
    function parseURLParams() {
        var regex = /[?&]([^=#]+)=([^&#]*)/g,
            url = window.location.href,
            params = { secret: "", rows: "", includeAudit: 0 },
            match;
        while ((match = regex.exec(url))) {
            params[match[1]] = match[2];
        }
        return params;
    }

    self.formatPhoneNumber = function(s) {
        var s2 = ("" + s).replace(/\D/g, "");
        var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
        return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
    }

    // have the user, continue...
    self.haveUserContinue = function(theUser, whichReport) {
        authenticatedUser = theUser;
        var params = parseURLParams();

        // initialize page controls
        function initControls() {

            $("#resultTable").on("click", "tr", function (event) {

                rowInEdit = table.row(this);
                if (rowInEdit === null) return;

                target = $(event.target);

                if (target.is('th')) return;

                if (target.is('.editable')) {
                    // while we are editing rows (but haven't yet pushed save)
                    // update the table, but do NOT reload data.
                    isEditing = true;
                    attributeEditing = (target[0].className.split(" "))[2];

                    $('.tableCellEditor').css({ left: $(event.target).offset().left, top: $(event.target).offset().top+4})

                    if($(".tableCellEditor").length != 0) {
                        $(".tableCellEditor").val('');
                        $(".tableCellEditor").show();
                        $(".tableCellEditor").focus();
                    } else {
                    }
                }
                return false;
            });

            $("input.tableCellEditor").on('keyup', function (event) {

                if (event.keyCode === 27) {
                    $(".tableCellEditor").hide();
                    return false;
                }
                if (event.keyCode === 13) {
                        newValue = $(".tableCellEditor").val();
                        rowInEdit.data()[attributeEditing]= newValue;

                    // update the table row.
                    rowInEdit.invalidate().draw("page");
                    var saveMe = rowInEdit.data();
                    var key = saveMe.key;
                    var nodeToUpdate = "logData/supportBlue/runners/" + key+"/runners/";

                    // persist the change to the database
                    firebaseFuncsNew.ref.child(nodeToUpdate).once("value", function (snapshot) {
                        // read the runners array for the given key (registrant could have registered multiple people)
                        var runnersToUpdate = snapshot.val();
                        if (runnersToUpdate) {
                            // set the square order number for each runner. Assumption here is that the
                            // registrant paid only once, for all runners
                            $.each(runnersToUpdate, function(index,value) {
                                if (rowInEdit.data().runner === index)
                                    value[attributeEditing] = newValue;
                                    value.modifiedDate = moment(new Date()).format("MM/DD/YYYY hh:mm:ss");
                                    console.log("editing " + key+" attr: "+attributeEditing+" value: "+newValue);
                            });
                            firebaseFuncsNew.ref.child(nodeToUpdate).set(runnersToUpdate,
                                function (error) {
                                    if (error) {
                                        // no error handler at the moment
                                    };
                                }
                            );
                        }
                    })

                    $(".tableCellEditor").hide();
                }
            })
       }

        // draw datatables report
        function drawReport(tableData, reportCols, columnDefs, tableRows) {

            $("#reportWrapper").show();

            if (table) table.destroy();
            $("#resultTable").empty();

            // build a dynamic datatables object
            table = $("#resultTable").DataTable({
                dom: "Bfrtip",
                buttons: [
                    "copy", "csv", "excel", "pdf", "print", {
                        text: "update", action: function(e, dt, node, config) {
                            // if the save button is clicked, set the
                            // is editing flag to false, and redraw the
                            // table.
                            isEditing = false;
                            drawReport(tableData, reportCols, columnDefs, tableRows);
                        }
                    }
                ],
                initComplete: function() {
                    $("#reportWrapper").show();
                    $("#resultTable").show();
                    $(".loadingWait").hide();
                },
                "orderClasses": false,
                data: tableData,
                columns: reportCols,
                destroy: true,
                lengthMenu: [5, 6, 7, 10, 12, 15, 20, 25, 50, 100, 1000, 5000],
                paging: true,
                pagingType: "full_numbers",
                deferRender: true,
                columnDefs: columnDefs,
                processing: true,
                pageLength: tableRows,
                searchHighlight: true,
            });
        }

        function createMailtoLink(email) {
            return "<a href='mailto:" + email + "&subject= Support Blue Run, February 26, 2016'>" + email + "</a>";
        }

        // load data from firebase
        function loadData(whichReport) {
            var data = [];
            var reportCols = [];
            var columnDefs = [];
            var tableRows = 10;
            var tableData = [];

            switch (whichReport) {
            case 1:
                $(".reportHeader").html("Register Runners");
                // define the dataTables columns names, and column headers
                reportCols = [
                { "data": "runnerEvent", "title": "Event", "bSortable": "true", "className": "editable runnerEvent" },
                    { "data": "runnerFirst", "title": "First", "className" :  "editable runnerFirstName" },
                    { "data": "runnerLast", "title": "Last", "bSortable":"true", "className": "editable runnerLastName" },
                    { "data": "runnerGender", "title": "M/F", "className" : "editable runnerGender" },
                    { "data": "runnerDateOfBirth", "title": "Dob", "className" : "editable runnerDateOfBirth", "bSortable" : "true" },
                    { "data": "runnerPhone", "title": "Phone", "className" : "editable runnerPhone" },
                    { "data": "runnerShirtSize", "title": "Size", "className" : "editable runnerShirtSize" },
                    { "data": "runnerTeamName", "title": "Team" , "className" : "editable runnerTeamName"},
                    { "data": "registeredBy", "title": "Registered By", "className" : "registeredBy" },
                    { "data": "runnerEmail", "title": "Runner Email", "className" : "editable runnerEmail"  },
                    { "data": "waiverOn", "title": "Waiver Accepted", "className" : "editable waiverSigned", "bSortable" : "true" },
                    { "data": "orderNumber", "title": "Square #", "className" : "editable orderNumber", "bSortable": "true" },
                    //{ "data": "key", "title" : "key", "className" : "orderNumber", "bVisible" : "false" }
                    //{ "data": "orderNumber", "title": "SQ order #"}
                ];
                firebaseFuncsNew.ref.child("logData/supportBlue/runners/").on("value", function(snapshot) {
                    data = snapshot.val();
                    if (!data) {
                        $("#resultTableContainer").html("<div style='text-align:center; margin-top: 20vh;font-size:2em'>there is no data to display.</div>");
                        return;
                    }
                    tableData = [];

                    // transform the data
                    $.each(data, function(key, val) {
                        if (key) {
                            $.each(val.runners, function(key2, val2) {
                                var rowData = {};
                                rowData.registeredBy = createMailtoLink(val.registeredBy || "");
                                rowData.runnerEmail = createMailtoLink(val2.runnerEmail || "");
                                //rowData.RunnerEmail = val2.runnerEmail || "";
                                rowData.runnerEvent = val2.runnerEvent || "";
                                rowData.runnerFirst = val2.runnerFirstName || "";
                                rowData.runnerLast = val2.runnerLastName || "";
                                rowData.runnerDateOfBirth = window.moment(new Date(val2.runnerDateOfBirth || '01/01/1900')).format("MM/DD/YYYY");
                                rowData.runnerDateOfBirth = (rowData.runnerDateOfBirth === "01/01/1900" ? "unknown" : rowData.runnerDateOfBirth);
                                rowData.runnerGender = val2.runnerGender || "";
                                rowData.runnerPhone = self.formatPhoneNumber(val2.runnerPhone);
                                rowData.runnerShirtSize = val2.runnerShirtSize || "";
                                rowData.runnerTeamName = val2.runnerTeamName || "";
                                rowData.waiverOn = moment(new Date(val2.waiverSigned)).format("MM/DD/YYYY HH:mm");
                                rowData.orderNumber = val2.orderNumber || '';
                                rowData.key = key;
                                rowData.runner = key2;
                                rowData.modified = false;
                                tableData.push(rowData);
                            });
                        }
                    });

                    // each thing might have its own params, so tack on global ones
                    columnDefs = [
                        // turn off sorting icons
                        { "bSortable": false, "className": "dtCellPadding", "aTargets": ["_all"] },
                        { "targets" : [0], "width" : "50px"},
                        { "targets": [2], "width": "100px" },
                        { "targets": [2], "width": "50px" },
                        { "targets": [5], "width": "120px" },
                        { "targets" : [7], "width" : "100px"},
                        { "targets" : [8,9], "width" : "130px"},
                        { "targets" : [10], "width" : "120px"},
                        { "targets": [11], "className": "orderNumber" }
                    ];

                    if(!isEditing) drawReport(tableData, reportCols, columnDefs, tableRows);
                });
                break;

                case 2:
                $(".reportHeader").html("Support Blue Sunday");
                reportCols = [
                    { "data": "SBSundayFirst", "title": "First" },
                    { "data": "SBSundayLast", "title": "Last" },
                    { "data": "SBSundayEmail", "title": "Email" },
                    { "data": "SBSundayPhone", "title": "Phone" },
                    { "data": "SBSundayChurch", "title": "Church" }
                ];
                firebaseFuncsNew.ref.child("logData/supportBlue/SBSunday/").on("value", function(snapshot) {
                    data = snapshot.val();
                    if (!data) {
                        $("#resultTableContainer").html("<div style='text-align:center; margin-top: 20vh;font-size:2em'>there is no data to display.</div>");
                        return;
                    }
                    tableData = [];

                    // transform the data
                    $.each(data, function(key, val) {
                        var rowData = {};
                        if (key) {
                            rowData.SBSundayPhone = self.formatPhoneNumber(key);
                            rowData.SBSundayEmail = val.SBSundayEmail;
                            rowData.SBSundayFirst = val.SBSundayFirst;
                            rowData.SBSundayLast = val.SBSundayLast;
                            rowData.SBSundayChurch = val.SBSundayChurch;
                        }
                    tableData.push(rowData);
                    });

                    // each thing might have its own params, so tack on global ones
                    columnDefs = [
                        // turn off sorting icons
                        { "bSortable": false, "className": "dtCellPadding", "aTargets": ["_all"] },
                        {
                            "targets": [2, 4],
                            "width": "10%"
                        }
                    ];
                    drawReport(tableData, reportCols, columnDefs, tableRows);
                });
                break;

                case 3:
                $(".reportHeader").html("Sponsors");
                reportCols = [
                    { "data": "sponsorFirst", "title": "First" },
                    { "data": "sponsorLast", "title": "Last" },
                    { "data": "sponsorEmail", "title": "Email" },
                    { "data": "sponsorPhone", "title": "Phone" },
                    { "data": "sponsorLevel", "title": "Level" },
                    { "data": "sponsorCompany", "title": "Company" }
                ];
                firebaseFuncsNew.ref.child("logData/supportBlue/sponsors/").on("value", function(snapshot) {
                    data = snapshot.val();
                    if (!data) {
                        $("#resultTableContainer").html("<div style='text-align:center; margin-top: 20vh;font-size:2em'>there is no data to display.</div>");
                        return;
                    }

                    tableData = [];

                    // transform the data
                    $.each(data, function (key, val) {
                        var rowData = {};
                        if (key) {
                            rowData.sponsorPhone = self.formatPhoneNumber(key);
                            rowData.sponsorEmail = val.sponsorEmail;
                            rowData.sponsorFirst = val.sponsorFirst;
                            rowData.sponsorLast = val.sponsorLast;
                            rowData.sponsorLevel = val.sponsorLevel;
                            rowData.sponsorCompany = val.sponsorCompany;
                        }
                        tableData.push(rowData);
                    });

                    // each thing might have its own params, so tack on global ones
                    columnDefs = [
                        // turn off sorting icons
                        { "bSortable": false, "className": "dtCellPadding", "aTargets": ["_all"] },
                        {
                            "targets": [2, 4],
                            "width": "10%"
                        }
                    ];

                    drawReport(tableData, reportCols, columnDefs, tableRows);
                });
                break;
                case 4:
                    $(".reportHeader").html("Rifles ordered");
                    reportCols = [
                        { "data": "rifleSignupFirst", "title": "First" },
                        { "data": "rifleSignupLast", "title": "Last" },
                        { "data": "rifleSignupEmail", "title": "Email" },
                        { "data": "rifleSignupPhone", "title": "Phone" },
                        { "data": "rifleSignupBadgeNumber", "title": "Badge Number" },
                        { "data": "rifleSignupStock", "title": "Selected Rifle Stock" }
                    ];
                    firebaseFuncsNew.ref.child("logData/supportBlue/rifleData/").on("value", function (snapshot) {
                        data = snapshot.val();
                        if (!data) {
                            $("#resultTableContainer").html("<div style='text-align:center; margin-top: 20vh;font-size:2em'>there is no data to display.</div>");
                            return;
                        }
                        tableData = [];

                        // transform the data
                        $.each(data, function (key, val) {
                            var rowData = {};
                            if (key) {
                                rowData.rifleSignupPhone = self.formatPhoneNumber(key);
                                rowData.rifleSignupEmail = val.rifleSignupEmail || "";
                                rowData.rifleSignupFirst = val.rifleSignupFirst || "";
                                rowData.rifleSignupLast = val.rifleSignupLast || "";
                                rowData.rifleSignupBadgeNumber = val.rifleSignupBadgeNumber || "";
                                rowData.rifleSignupStock = val.rifleSignupStock || "";
                            }
                            tableData.push(rowData);
                        });

                        // each thing might have its own params, so tack on global ones
                        columnDefs = [
                            // turn off sorting icons
                            { "bSortable": false, "className": "dtCellPadding", "aTargets": ["_all"] },
                            //{
                            //    "targets": [2, 3, 4],
                            //    "width": "10%"
                            //}
                            //,{
                            //    "targets": [1,2],
                            //    "width": "10%"
                            //}
                        ];
                        drawReport(tableData, reportCols, columnDefs, tableRows);
                    });
                    break;
            }

        }

        initControls();
        loadData(whichReport);
    }

    return self;
}(window, jQuery));
