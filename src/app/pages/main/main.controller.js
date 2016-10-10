'use strict';

let dropTargetRectangles = [];

function MainController($log, $scope, grid, $window) {
    'ngInject';

    $scope.grid = grid;

    function initPallet() {

        let pallets = document.getElementsByClassName('pallet dragble');

        for (let i = 0; i < pallets.length; i++) {
            pallets[i].onmousedown = onmousedown;
            pallets[i].ondragstart = ondragstart;
        }


    }

    $window.onload = function() {

        initPallet();

        dropTargetRectangles = cacheDropTargetRectangles();


    };


}

function getCurrentTarget(e) {
    for (var i = 0; i < dropTargetRectangles.length; i++) {
        var rect = dropTargetRectangles[i];

        if (
            (e.pageX > rect.xmin) &&
            (e.pageX < rect.xmax) &&
            (e.pageY > rect.ymin) &&
            (e.pageY < rect.ymax)) {
            return rect.dropTarget
        }
    }

    return null
}

function onmousedown(e) {
    let primaryEl = this;
    let coords = getCoords(primaryEl);
    let shiftX = e.pageX - coords.left;
    let shiftY = e.pageY - coords.top;

    let clone = primaryEl.cloneNode(true);
    document.body.appendChild(clone);

    clone.style.position = 'absolute';
    primaryEl.style.visibility = 'hidden';

    moveAt.call(clone, e, shiftX, shiftY);

    clone.style.zIndex = 1000;

    let currentTarget = {val: null};
    document.onmousemove = function(e) {
        moveAt.call(clone, e, shiftX, shiftY);
        let newTarget = getCurrentTarget(e);

        if (newTarget) {
            // console.log('newTarget', newTarget, currentTarget);
            newTarget.classList.add('hoverItem');



        }
        if (currentTarget.val && currentTarget.val !== newTarget)
            currentTarget.val.classList.remove('hoverItem');

        currentTarget.val = newTarget;

    };

    clone.onmouseup = onmouseup.bind(clone, primaryEl, currentTarget);
}

function ondragstart() {
    return false;
}

function moveAt(e, shiftX, shiftY) {
    this.style.left = e.pageX - shiftX + 'px';
    this.style.top = e.pageY - shiftY + 'px';
}

function onmouseup(primaryEl, currentTarget) {
    document.onmousemove = null;
    this.onmouseup = null;
    primaryEl.style.visibility = 'visible';
    this.parentNode.removeChild(this);
    console.log('currentTarget', currentTarget);
    currentTarget.val.classList.remove('hoverItem');
}

function cacheDropTargetRectangles() {
    let dropTargetRectangles = [],
        gridItems = document.getElementsByClassName('pallet gridItem');
    console.log(gridItems, gridItems.length);
    for (var i = 0; i < gridItems.length; i++) {
        var targ = gridItems[i];
        var targPos = getPosition(targ);
        var targWidth = parseInt(targ.offsetWidth);
        var targHeight = parseInt(targ.offsetHeight);

        dropTargetRectangles.push({
            xmin: targPos.x,
            xmax: targPos.x + targWidth,
            ymin: targPos.y,
            ymax: targPos.y + targHeight,
            dropTarget: targ
        });

    }

    return dropTargetRectangles;
}

function getPosition(e) {
    var left = 0;
    var top = 0;

    while (e.offsetParent) {
        left += e.offsetLeft;
        top += e.offsetTop;
        e = e.offsetParent;
    }

    left += e.offsetLeft;
    top += e.offsetTop;

    return { x: left, y: top };
}

function getCoords(elem) {
    let box = elem.getBoundingClientRect();

    let body = document.body;
    let docEl = document.documentElement;

    let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    let scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    let clientTop = docEl.clientTop || body.clientTop || 0;
    let clientLeft = docEl.clientLeft || body.clientLeft || 0;

    let top = box.top + scrollTop - clientTop;
    let left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top), left: Math.round(left) };
}

export default MainController;
