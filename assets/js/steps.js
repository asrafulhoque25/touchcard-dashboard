$(document).ready(function () {
    // <!-- Horizontal-steps JS Init -->
    $(function () {
        if ($(".btn-next-step").length) {
            $(".btn-next-step").on("click", function (event) {
                event.preventDefault();
                if ($(".step").find(".step-item.active").next().length > 0) {
                    $(".step").find(".step-item.active").removeClass("active").next().addClass("active").prevAll().addClass("completed");
                    let stepTarget = $(".step").find(".step-item.active").data("step-target");
                    $(".step-content .step-content-list").hide();
                    $(".step-content .step-content-list").filter(`[data-step='${stepTarget}']`).show();
                }
            });
        }

        if ($(".btn-prev-step").length) {
            $(".btn-prev-step").on("click", function (event) {
                event.preventDefault();
                if ($(".step").find(".step-item.active").prev().length > 0) {
                    $(".step").find(".step-item.active").removeClass("active").prev().addClass("active").nextAll().removeClass("completed");
                    let stepTarget = $(".step").find(".step-item.active").data("step-target");
                    $(".step-content .step-content-list").hide();
                    $(".step-content .step-content-list").filter(`[data-step='${stepTarget}']`).show();
                }
            });
        }
    });
});
