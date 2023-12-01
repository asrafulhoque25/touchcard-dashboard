var ChkbxTable = (() => {
    "use strict";

    NodeList.prototype.toArray = function () {
        return [].slice.call(this);
    };

    var checkboxCheckAll = null,
        checkboxes = null,
        checkboxCounter = null,
        actionBtns = null,
        options = {},
        defaults = {
            checkboxAllAttr: "chklist-all",
            checkboxAttr: "chklist",
            checkboxCountAttr: "chklist-count",
        };

    var _setOptions = (config) => {
        if (typeof config === "object") {
            for (var key in defaults) {
                if (!defaults.hasOwnProperty(key)) {
                    continue;
                }
                options[key] = typeof config[key] === "undefined" ? defaults[key] : config[key];
            }
        }
    };

    var _getElements = () => {
        checkboxCheckAll = document.querySelector(`[${options.checkboxAllAttr}]`);
        checkboxes = document.querySelectorAll(`[${options.checkboxAttr}]`).toArray();
        checkboxCounter = document.querySelector(`[${options.checkboxCountAttr}]`);
        actionBtns = document.querySelectorAll(`[${options.actionBtnAttr}]`).toArray();
    };

    var _enableAction = (btns) => {
        btns.forEach((btn) => {
            btn.classList.remove(options.actionBtnClass);
            btn.disabled = false;
        });
    };

    var _disableAction = (btns) => {
        btns.forEach((btn) => {
            btn.classList.add(options.actionBtnClass);
            btn.disabled = true;
        });
    };

    var _actionManager = (checkbox, count) => {
        if (count > 0) {
            _enableAction.call(checkbox, actionBtns);
        } else if (count === 0) {
            _disableAction.call(checkbox, actionBtns);
        }
    };

    var _checkSelectAll = (checkbox) => {
        checkbox.checked = true;
    };

    var _uncheckSelectAll = (checkbox) => {
        checkbox.checked = false;
    };

    var _selectAllManager = (count, checkboxes) => {
        if (count === checkboxes.length) {
            _checkSelectAll(checkboxCheckAll);
        } else if (count < checkboxes.length) {
            _uncheckSelectAll(checkboxCheckAll);
        }
    };

    var _outputCheckboxCount = (element, count) => {
        var countText = count > 1 ? "items selected" : "item selected";
        element.innerHTML = `${count}${element.getAttribute("chklist-count")} ${countText}`;
    };

    var _checkboxesManager = (checkboxes) => {
        var newThread = setTimeout(() => {
            var checkboxCount = checkboxes.filter((c) => c.checked).length;

            _actionManager(this, checkboxCount);
            _selectAllManager(checkboxCount, checkboxes);
            _outputCheckboxCount(checkboxCounter, checkboxCount);
        }, 0);
    };

    var triggerEvent = (element, event) => {
        if ("createEvent" in document) {
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent(event, false, true);
            element.dispatchEvent(evt);
        } else {
            element.fireEvent(`on${event}`);
        }
    };

    var _selectAll = (self, checkboxes) => {
        checkboxes.forEach((checkbox) => {
            triggerEvent(checkbox, "change");

            return self.checked ? (checkbox.checked = true) : (checkbox.checked = false);
        });
    };

    var _bindListeners = () => {
        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener("change", function () {
                _checkboxesManager(checkboxes);
            });
        });

        checkboxCheckAll.addEventListener("change", function () {
            _selectAll(this, checkboxes);
        });
    };

    var init = (config) => {
        _setOptions(config);
        _getElements();
        _bindListeners();
        _disableAction(actionBtns);
        _outputCheckboxCount(checkboxCounter, 0);
    };

    return { init: init };
})();

document.addEventListener("DOMContentLoaded", ChkbxTable.init);
