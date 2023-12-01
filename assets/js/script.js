/**
 * @Script js for (Template/Project Name)
 *
 * @project     - Project Name
 * @author      -
 * @created_by  -
 * @created_at  -
 * @modified_by -
 */

/**
 * ========================================================
 * this function execute when window properly loaded
 * ===========================================================
 */

$(window).on("load", function () {
    //  $('.btn-sidebar-toggle')
    // init on mobile
    $(function () {
        if (window.matchMedia("(max-width: 991px)").matches) {
            $("body").addClass("sidebar-collapsed");
        } else {
            $("body").removeClass("sidebar-collapsed");
        }

        $(window).resize(function () {
            if (window.matchMedia("(max-width: 991px)").matches) {
                $("body").addClass("sidebar-collapsed");
            } else {
                $("body").removeClass("sidebar-collapsed");
            }
        });
    });
});

/**
 * ========================================================
 * this function execute when DOM element ready
 * ===========================================================
 */

jQuery(document).ready(function ($) {
    /**
     * selectpicker
     * @Script {selectpicker init}
     * @created_by  - Kawsar Bin Siraj
     */
    $(function () {
        if ($("#myPicker2").length) {
            $("#myPicker2").selectpicker();
            $("#myPicker2").on("changed.bs.select", function (e, clickedIndex, newValue, oldValue) {
                if (newValue === true) {
                    if (oldValue.includes("*")) {
                        let filteredValue = $(this)
                            .val()
                            .filter((i) => i !== "*");
                        $("#myPicker2").selectpicker("val", filteredValue);
                    } else {
                        if ($(this).val().includes("*")) {
                            $("#myPicker2").selectpicker("val", ["*"]);
                        }
                    }
                }
            });
        }
    });

    /**
     * Campaign Schedule
     * @Script {Set a daily sending schedule for this campaign}
     * @created_by  - Kawsar Bin Siraj
     */

    $(function () {
        let dailySendingSchedule = [];
        $('#dailySendingSchedule input[type="checkbox"]').each(function () {
            if ($(this).is(":checked")) {
                dailySendingSchedule.push($(this).val());
            }
            const checkLength = () => {
                if (dailySendingSchedule.length < 2) {
                    $('#dailySendingSchedule input[type="checkbox"]:checked').closest("label").css({
                        "pointer-events": "none",
                        cursor: "not-allowed",
                    });
                } else {
                    $('#dailySendingSchedule input[type="checkbox"]:checked').closest("label").removeAttr("style");
                }
            };
            checkLength();
            $(this).on("change", function () {
                if ($(this).is(":checked")) {
                    dailySendingSchedule.push($(this).val());
                } else {
                    dailySendingSchedule = dailySendingSchedule.filter((v) => v !== $(this).val());
                }
                checkLength();
            });
        });
    });

    /**
     * Date RangePicker
     * @Script {Init}
     * @created_by  - Kawsar Bin Siraj
     */

    $(function () {
        if ($("#dateRangePickerInput").length) {
            $("#dateRangePickerInput")
                .dateRangePicker({
                    format: "MMMM D YYYY",
                    separator: " - ",
                    singleMonth: true,
                    showShortcuts: false,
                    showTopbar: false,
                    inline: true,
                    alwaysOpen: true,
                    container: "#dateRangerPickerInputMode",
                    getValue: function () {
                        if ($("#from-input").val() && $("#to-input").val()) {
                            $("#from-input").val() + " - " + $("#to-input").val();
                        } else {
                            return "";
                        }
                    },
                    setValue: function (s, s1, s2) {
                        $("#from-input").val(moment(s1).format("MM-DD-YYYY"));
                        $("#to-input").val(moment(s2).format("MM-DD-YYYY"));
                        $(this).val(`${moment(s1).format("MMMM DD")} - ${moment(s2).format("MMMM DD YYYY")}`);
                    },
                })
                .bind("datepicker-first-date-selected", function (event, obj) {
                    if ($("#dateRangePickerSelect").text().toLowerCase() === "custom") {
                        $("#dateRangePickerSelect").text($("#dateRangePickerSelect").text());
                    } else {
                        $("#dateRangePickerSelect").text($("#dateRangePickerSelect").data("placeholder"));
                    }
                    $("#dateRangePickerSelect").val("");
                });

            $("#dateRangePickerInput").focus(function () {
                $(".dateRangePickerInput-dropdown").show();
            });
        }

        $(window).on("click", function (event) {
            if (!$(event.target).closest(".selectDate").length && !$(event.target).closest(".daterangepicker li").length) {
                if ($(".dateRangePickerInput-dropdown").is(":visible")) {
                    $(".dateRangePickerInput-dropdown").hide();
                }
            }
        });

        if ($("#dateRangePickerSelect").length) {
            $("#dateRangePickerSelect").text($("#dateRangePickerSelect").data("placeholder"));
            $("#dateRangePickerSelect").daterangepicker(
                {
                    startDate: moment(),
                    endDate: moment(),
                    showCustomRangeLabel: false,
                    locale: {
                        cancelLabel: "Clear",
                    },
                    ranges: {
                        Today: [moment(), moment()],
                        Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
                        "Last 7 Days": [moment().subtract(6, "days"), moment()],
                        "Last 30 Days": [moment().subtract(29, "days"), moment()],
                        "This Month": [moment().startOf("month"), moment().endOf("month")],
                        "Last Month": [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")],
                        Custom: ["c1", "c2"],
                    },
                },
                function (start, end, label) {
                    if (label.toLowerCase() === "custom") {
                        $("#dateRangePickerSelect").text(label);
                        $(".dateRangePickerInput-dropdown").show();
                        $("#from-input").val("");
                        $("#to-input").val("");
                        $("#dateRangePickerInput").data("dateRangePicker").setDateRange(moment().format("MMMM DD"), moment().format("MMMM DD YYYY"));
                    } else {
                        $("#dateRangePickerSelect").text(label);
                        $("#from-input").val(start.format("MM-DD-YYYY"));
                        $("#to-input").val(end.format("MM-DD-YYYY"));
                        $("#dateRangePickerInput").data("dateRangePicker").setDateRange(start.format("MMMM DD"), end.format("MMMM DD YYYY"));
                    }
                }
            );
        }

        $("#from-input").on("input", function () {
            let dateString = new Date($(this).val()).toDateString();
            $("#dateRangePickerInput").data("dateRangePicker").setStart(moment(dateString).format("MMMM DD YYYY"));
            $("#errMsg.errMsg-for-fromInputEmpty").remove();
        });
        $("#to-input").on("input", function (e) {
            if ($("#from-input").val() !== "") {
                let toValue = moment($("#from-input").val()).format("MM-DD-YYYY");
                let dateString = new Date($(this).val()).toDateString();
                let dateWithFormate = moment(dateString).format("MM-DD-YYYY");
                if (moment(dateWithFormate).isSameOrAfter(toValue) === true) {
                    $("#dateRangePickerInput").data("dateRangePicker").setEnd(moment(dateString).format("MMMM DD YYYY"));
                    $("#errMsg").remove();
                } else {
                    $("#errMsg").remove();
                    $('<p id="errMsg" class="mb-0 text-danger">The end date must be equal to or greater than the date of the start date</p>').insertBefore("#dateRangerPickerInputMode");
                }
            } else {
                $("#errMsg").remove();
                $('<p id="errMsg" class="mb-0 errMsg-for-fromInputEmpty text-danger">You should set start date before end date</p>').insertBefore("#dateRangerPickerInputMode");
                e.stopPropagation();
            }
        });
    });

    /**
     * append/show/hide & manually modal open/close
     * @Script {custom}
     * @created_by  - Kawsar Bin Siraj
     */
    $(function () {
        $(".btn-CampAddNewAddressModal-close").on("click", function (e) {
            $(".new-address-book > div").remove();
            if ($(".pick-new-address:checked").length < 1) return alert("Please select any address as you want !");
            let newAddress = $(".pick-new-address:checked").closest(".type-item").clone();
            newAddress.appendTo(".new-address-book").wrap("<div class='col-xl-3 col-md-6'></div>");
            $(".oldContactBtn").hide();
            $(".new-address-book .pick-new-address").hide();
            $("#CampAddNewAddress").modal("hide");
        });
        $(".btn-CampOnOffTabAddNewAddressModal-close").on("click", function (e) {
            if ($("#CampOnOffTabAddNewAddress .pick-new-address:checked").length < 1) return alert("Please select any address as you want !");
            $("#CampOnOffTabAddNewAddress").modal("hide");
            setTimeout(() => {
                $(".toggleTrigerItem").toggle();
            }, 300);
        });
        $("#UserConfirmDeleteShow .fillColorBtn .btn").on("click", function () {
            $("#UserConfirmDeleteShow").modal("hide");
            setTimeout(() => {
                $(".new-address-book > div").remove();
                $(".oldContactBtn").show();
            }, 300);
        });
        $("#newCampOnOffReturnAdd .fillColorBtn .btn").on("click", function () {
            $("#newCampOnOffReturnAdd").modal("hide");
            setTimeout(() => {
                $(".toggleTrigerItem").toggle();
            }, 300);
        });
    });

    //  $('.btn-sidebar-toggle')
    // init
    $(function () {
        $(".btn-sidebar-toggle").on("click", function (e) {
            e.preventDefault();
            $("body").toggleClass("sidebar-collapsed");
            $(".nav-copyright, .credit").hide();
            $(".logo").hide();
            $(".bar-icon").show();
            $(".logo-sm").addClass("d-block").removeClass("d-none");
            $(".drop-down-link").removeClass("dropdown-toggle");
        });
        $(".bar-icon").on("click", function (e) {
            e.preventDefault();
            $("body").toggleClass("sidebar-collapsed");
            $(this).hide();
            $(".logo").show();
            $(".logo-sm").addClass("d-none").removeClass("d-block");
            $(".nav-copyright, .credit").show();
        });
        $(".navbar-logo").on("click", function (e) {
            if ($("body").hasClass("sidebar-collapsed")) {
                e.preventDefault();
                $("body").toggleClass("sidebar-collapsed");
                $(".nav-copyright, .credit").show();
                $(".drop-down-link").addClass("dropdown-toggle");
                $(".logo").show();
                $(".logo-sm").addClass("d-none").removeClass("d-block");
            }
        });
    });

    // Select2
    $(function () {
        if ($(".select-2-init").length) {
            $(".select-2-init").select2({
                dropdownAutoWidth: true,
                width: "resolve",
            });
        }
    });

    // edit address delete
    $(".single-card .delete-btn").on("click", function () {
        $(this).closest(".single-card").hide();
    });

    // select2 with checkbox
    $(".js-select2").select2({
        closeOnSelect: false,
        placeholder: "Placeholder",
        allowHtml: true,
        allowClear: true,
        tags: true,
    });

    $(".icons_select2").select2({
        width: "100%",
        templateSelection: iformat,
        templateResult: iformat,
        allowHtml: true,
        placeholder: "All campaigns",
        dropdownParent: $(".select-icon"),
        allowClear: true,
        multiple: false,
    });

    function iformat(icon, badge) {
        var originalOption = icon.element;
        var originalOptionBadge = $(originalOption).data("badge");
        return $('<span><i class="bi ' + $(originalOption).data("icon") + '"></i> ' + icon.text + '<span class="badge">' + originalOptionBadge + "</span></span>");
    }

    // datepicker init
    $(function () {
        if ($(".datepicker").length) {
            $(".datepicker").datepicker({
                dateFormat: "mm yy",
                changeMonth: true,
                changeYear: true,
                numberOfMonths: 2,
            });
        }
    });

    // pass show hide
    $(function () {
        $("#show_hide_password a").on("click", function (event) {
            event.preventDefault();
            if ($("#show_hide_password input").attr("type") == "text") {
                $("#show_hide_password input").attr("type", "password");
                $("#show_hide_password i").addClass("fa-eye-slash");
                $("#show_hide_password i").removeClass("fa-eye");
            } else if ($("#show_hide_password input").attr("type") == "password") {
                $("#show_hide_password input").attr("type", "text");
                $("#show_hide_password i").removeClass("fa-eye-slash");
                $("#show_hide_password i").addClass("fa-eye");
            }
        });
    });

    // Datepicker New Campaign Start

    // $(function () {
    //     $("#camDatepicker1").datepicker({
    //         minDate: 0,
    //         maxDate: "+1M +10D",
    //         numberOfMonths: 1,
    //         onSelect: function (dateText, inst) {
    //             $("#camDatepicker2").prop("disabled", false);
    //         },
    //     });
    // });

    // $(function () {
    //     $("#camDatepicker2").datepicker({
    //         minDate: 0,
    //         maxDate: "+1M +10D",
    //         numberOfMonths: 1,
    //         onSelect: function (dateText, inst) {
    //             $("#camDatepicker2").prop("disabled", false);
    //         },
    //     });
    // });

    //datepicker start date end date
    $(function () {
        var firstDate;
        var lastDate;
        $("#camDatepicker1").datepicker({
            dateFormat: "dd-m-yy",
            minDate: 0,
            maxDate: "+1M +10D",
        });
        $("#camDatepicker2").datepicker({
            dateFormat: "dd-m-yy",
        });
        $("#camDatepicker1").change(function () {
            // $("#camDatepicker2").prop("disabled", false);
            firstDate = $(this).datepicker("getDate");
            $("#camDatepicker2").datepicker("option", "minDate", firstDate).prop("disabled", false);
        });
        $("#camDatepicker2").change(function () {
            lastDate = $(this).datepicker("getDate");
            $("#camDatepicker1").datepicker("option", "maxDate", lastDate);
        });
    });
    //datepicker start date end date close

    $(function () {
        $("#camDatepicker3").datepicker({
            minDate: 0,
            maxDate: "+1M +10D",
            numberOfMonths: 1,
            onSelect: function (dateText, inst) {
                $("#camDatepicker2").prop("disabled", false);
            },
            numberOfMonths: 1,
        });
    });

    $(function () {
        $("#campaignContinuously").click(function () {
            // if ($(this).is(":checked")) {
            //     $(this).closest(".accordion").find("#startEndDate").show();
            // } else {
            //     $(this).closest(".accordion").find("#startEndDate").hide();
            // }
            $(this).closest(".accordion").find(".newCampEndDate").toggle();
        });
    });

    $(function () {
        $("#trackingCheck").click(function () {
            if ($(this).is(":checked")) {
                $("#pointFint").show();
            } else {
                $("#pointFint").hide();
            }
        });
    });
    $(function () {
        $("#trackingurl").click(function () {
            if ($(this).is(":checked")) {
                $("#pointurl").show();
            } else {
                $("#pointurl").hide();
            }
        });
    });
    $(function () {
        $("#trackUtm").click(function () {
            if ($(this).is(":checked")) {
                $("#trackUtmlField").show();
            } else {
                $("#trackUtmlField").hide();
            }
        });
    });
    $(function () {
        $("#trackingurl2").click(function () {
            if ($(this).is(":checked")) {
                $("#pointurl2").show();
            } else {
                $("#pointurl2").hide();
            }
        });
    });
    $(function () {
        $("#trackUtm2").click(function () {
            if ($(this).is(":checked")) {
                $("#trackUtmlField2").show();
            } else {
                $("#trackUtmlField2").hide();
            }
        });
    });
    $(function () {
        $("#trackingCheck2").click(function () {
            if ($(this).is(":checked")) {
                $("#pointFint2").show();
            } else {
                $("#pointFint2").hide();
            }
        });
    });

    // Uncheck other checkbox on one checked
    // $('input.example').on('change', function() {
    //     $('input.example').not(this).prop('checked', false);
    // });

    //add a class after click on tab

    //setting page
    if ($(".campaignSettingTab").length) {
        $(".form-check-label").on("click", function () {
            $(".form-check-label").removeClass("current");
            $(this).addClass("current");
        });
    }

    //campaign design page

    if ($(".postcardWrapper ").length) {
        $(".postcard").on("click", function () {
            $(".postcard").removeClass("current");
            $(this).addClass("current");
        });
    }

    // only one at least selected

    $(function () {
        let i,
            el = document.querySelectorAll('input[type="checkbox"][name="day"]'),
            onChange = function (ev) {
                ev.preventDefault();
                let _this = this,
                    arrVal = Array.prototype.slice.call(document.querySelectorAll('input[type="checkbox"][name="day"]:checked')).map(function (cur) {
                        return cur.value;
                    });

                if (arrVal.length) {
                } else {
                    _this.checked = true;
                }
            };

        for (i = el.length; i--; ) {
            el[i].addEventListener("change", onChange, false);
        }
    });
    $(function () {
        let i,
            el = document.querySelectorAll('input[type="checkbox"][name="days"]'),
            onChange = function (ev) {
                ev.preventDefault();
                let _this = this,
                    arrVal = Array.prototype.slice.call(document.querySelectorAll('input[type="checkbox"][name="days"]:checked')).map(function (cur) {
                        return cur.value;
                    });

                if (arrVal.length) {
                } else {
                    _this.checked = true;
                }
            };

        for (i = el.length; i--; ) {
            el[i].addEventListener("change", onChange, false);
        }
    });

    // only one at least selected

    //allTemplate

    if ($(".designWrapper").length) {
        $(".designTemplate").on("click", function () {
            $(".designTemplate ").removeClass("current");
            $(this).addClass("current");
        });
    }
    //add contact tab

    if ($(".groupMax").length) {
        $(".contactModal").on("click", function () {
            $(".contactModal ").removeClass("current");
            $(this).addClass("current");
        });
    }

    //campainTabWrapper

    //table check click then add a delete box

    if ($(".tableWrapper").length) {
        $(".instaCheckbox").on("click", function () {
            if ($(".instaCheckbox:checked").length > 0) {
                $(this).closest(".contactTable").find(".contact-edit").show();
                $(this).closest(".contactTable").find(".newVisibleBtn").show();
                $(this).closest(".contactTable").find(".defaultInvisibleBtn").hide();
            } else {
                $(this).closest(".contactTable").find(".contact-edit").hide();
                $(this).closest(".contactTable").find(".defaultInvisibleBtn").show();
                $(this).closest(".contactTable").find(".newVisibleBtn").hide();
            }
        });

        $(".checkAll").on("click", function () {
            if ($(".checkAll:checked").length > 0) {
                $(this).closest(".contactTable").find(".contact-edit").show();
            }

            if ($(".checkAll").not(":checked").length > 0) {
                $(this).closest(".contactTable").find(".contact-edit").hide();
            }
        });
    }

    // flip
    var s_round = ".s_round";
    $(s_round).hover(function () {
        $(".b_round").toggleClass("b_round_hover");
        return false;
    });

    $(s_round).click(function () {
        $(".flip_box").toggleClass("flipped");
        $(this).addClass("s_round_click");
        $(".s_arrow").toggleClass("s_arrow_rotate");
        $(".b_round").toggleClass("b_round_back_hover");
        return false;
    });

    $(s_round).on("transitionend", function () {
        $(this).removeClass("s_round_click");
        $(this).addClass("s_round_back");
        return false;
    });

    // delete and close icon
    // $(".deleteCursor").click(function () {
    //     $(this).closest(".col-xl-6").hide();
    // });

    // table row checked
    $(".checkAll").on("click", function () {
        $(this).closest("table").find("tbody :checkbox").prop("checked", this.checked).closest("tr").toggleClass("selected", this.checked);
    });

    $("tbody :checkbox").on("click", function () {
        // toggle selected class to the checkbox in a row
        $(this).closest("tr").toggleClass("selected", this.checked);

        // add selected class on check all
        $(this)
            .closest("table")
            .find(".checkAll")
            .prop("checked", $(this).closest("table").find("tbody :checkbox:checked").length == $(this).closest("table").find("tbody :checkbox").length);
    });

    //prevent dropdown
    if ($(".contactTable").length) {
        $(".dropdown-menu").click(function (e) {
            e.stopPropagation();
        });
    }

    // filter dropdown
    if ($(".droppable-area1").length) {
        $(".dropdown-menu").click(function (e) {
            e.stopPropagation();
        });
    }

    //click and template input checked
    $(function () {
        if ($(".eyeIcon").length) {
            $(".eyeIcon").click(function () {
                $(this).closest(".designTemplate").find(".checkInputTemplate").prop("checked", true);
            });
        }
    });
    //click and template input checked

    //chose advance filter model item
    $(function () {
        if ($(".selectt").length) {
            $(".selectt").on("click", ".forClose", function () {
                $(this).closest(".selectt").hide();
                var filterAttr = $(this).closest(".selectt").data("class");
                $('input[type="checkbox"]').each(function () {
                    if ($(this).val() === filterAttr) {
                        $(this).prop("checked", false);
                    }
                });
            });
        }

        $('input[type="checkbox"]').on("change", function () {
            var inputValue = $(this).val();
            $(".selectt").each(function () {
                if ($(this).data("class") === inputValue) {
                    $(this).toggle();
                }
            });
        });

        $(function () {
            $(init);
            function init() {
                $(".droppable-area1")
                    .sortable({
                        connectWith: ".connected-sortable",
                        stack: ".connected-sortable ul",
                    })
                    .disableSelection();
            }
        });
    });

    // month and year value change
    $(function () {
        $("#switch-id").change(function () {
            if ($(this).is(":checked")) {
                $(".contentB").show();
                $(".contentA").hide();
            } else {
                $(".contentB").hide();
                $(".contentA").show();
            }
        });
    });
    $(function () {
        $("#switch-id2").change(function () {
            if ($(this).is(":checked")) {
                $(".contentTabB").show();
                $(".contentTabA").hide();
            } else {
                $(".contentTabB").hide();
                $(".contentTabA").show();
            }
        });
    });

    // search input filtering
    $(".myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $(".mySearhList li").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });

    // searchbar shorting
    $(".mysearchInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $(".checkWrapper").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
    $(".mysearchInput1").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $(".checkWrapper1").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
    $(".mysearchInput2").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $(".checkWrapper2").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
    $(".mysearchInput3").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $(".checkWrapper3").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
    $(".mysearchInput4").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $(".checkWrapper4").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });

    // disable table row
    $(".fillColorBtn .addCreditBtn").on("click", function () {
        if ($(".form-check-input").is(":checked")) {
            $(".checkWrapper.selected").find(".toggleDisabledPlane1").css("text-decoration", "line-through");
            $(".checkWrapper.selected").find(".toggleDisabledPlane").toggleClass("d-inline").removeClass("d-none");
        } else {
            $(".checkWrapper.selected").find(".toggleDisabledPlane1").css("text-decoration", "none");
            $(".checkWrapper.selected").find(".toggleDisabledPlane").toggleClass("d-none").addClass("d-block");
        }
    });

    // disable table row delete
    $(".fillColorBtn .addCreditBtn.deleteRowtBtn").on("click", function () {
        if ($(".form-check-input").is(":checked")) {
            $(".checkWrapper.selected").hide();
        } else {
            $(".checkWrapper.selected").show();
        }
    });

    // ConfirmDeleteBtn
    $(".fillColorBtn .ConfirmDeleteBtn").on("click", function () {
        $(".oldContactBtn").show();
    });

    // countBox show hide in contact table
    $(".allSelectWrapper .allSelect").on("click", function () {
        if ($(".form-check-input").is(":checked")) {
            $(".countBox").slideToggle();
        } else {
            $(".countBox").hide();
        }
    });

    // FilterCountBox show hide in
    $(".allSelectWrapper .form-check").on("click", function () {
        if ($(".form-check-input").is(":checked")) {
            $(".FilterCountBox").show();
        } else {
            $(".FilterCountBox").hide();
        }
    });

    // contact table input edit
    $(".editOptionWrap > .editIcon").click(function () {
        $(this).siblings("input").toggleClass("form-control-plaintext form-control");
    });

    // Image upload
    var readURL = function (input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $(".profile-pic").attr("src", e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
        }
    };
    $(".file-upload").on("change", function () {
        readURL(this);
    });
    $(".saveImgBtn").on("click", function () {
        $(".upload-img").attr("src", $(".uploadedImg").attr("src"));
    });

    // count-checkbox-in-table
    var $checkboxes = $('#checkboxes-count-filter .dropdown-item .form-check input[type="checkbox"]');
    $checkboxes.change(function () {
        var countCheckedCheckboxes = $checkboxes.filter(":checked").length;
        $("#count-checked-checkboxes").text(countCheckedCheckboxes);
    });

    // switch attr push
    $(".campainTableActiveTrigger").on("click", function () {
        if ($(this).is(":checked")) {
            $(this).closest(".campainTableActive").find(".valueBox .form-control").prop("disabled", false);
            $(".switchValuesTitle").removeClass("titleDisable");
        } else {
            $(this).closest(".campainTableActive").find(".valueBox .form-control").prop("disabled", true);
            $(".switchValuesTitle").addClass("titleDisable");
        }
    });

    // designCarousel
    $(function () {
        if ($(".designCarousel").length) {
            $(".designCarousel").owlCarousel({
                items: 3,
                margin: 20,
                nav: true,

                loop: true,
                //   autoplay: true,
                autoplayTimeout: 2500,
                animateOut: "fadeOut",
                smartSpeed: 2500,
                dots: false,
                navText: ["<img src='assets/img/arrow-left.svg' class='img-fluid' />", "<img src='assets/img/arrow-right.svg' class='img-fluid' />"],
                dots: true,
                autoplayHoverPause: true,
                responsive: {
                    0: {
                        items: 1,
                    },
                    767: {
                        items: 1,
                    },
                    1200: {
                        items: 1,
                    },
                },
            });
        }
    });

    $(".customMultipleSelect .form-control").attr("placeholder", "Search");
});
