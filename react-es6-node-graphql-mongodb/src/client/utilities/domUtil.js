import $ from 'jquery';

class DOMUtil {
    resizeTextbox(element) {
        if (element.scrollHeight < 1) {
            return;
        }
        while(element.clientHeight >= element.scrollHeight) {
            element.style.height =
                parseInt(getComputedStyle(element).getPropertyValue('height'), 10) - 1 + "px";
        }
        while(element.clientHeight < element.scrollHeight) {
            element.style.height =
                parseInt(getComputedStyle(element).getPropertyValue('height'), 10) + 1 + "px";
        }
    }
}

export default new DOMUtil();
