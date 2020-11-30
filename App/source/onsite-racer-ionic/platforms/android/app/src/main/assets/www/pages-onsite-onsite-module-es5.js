(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-onsite-onsite-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/onsite/onsite.page.html":
/*!*************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/onsite/onsite.page.html ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n  <ion-header>\r\n    <ion-toolbar padding color=\"dark\">\r\n      <a href=\"https://www.t-systems-onsite.de/\">\r\n        <ion-img margin src=\"assets/iotracer/Logos/Logo T-Systems communication externe.png\"></ion-img>\r\n      </a>\r\n      <div style=\"text-align: center;\">\r\n        <ion-label color=\"primary\">On Site Services GmbH</ion-label>\r\n      </div>\r\n    </ion-toolbar>\r\n  </ion-header>\r\n  \r\n  <ion-content fullscreen class=\"ion-padding\" color=\"dark\">\r\n\r\n    <ion-slides margin pager=\"true\">\r\n\r\n        <ion-slide>\r\n          <div class=\"slide\">\r\n            <img src=\"assets/iotracer/onsite/box_unternehmen.jpg\"/>\r\n            <h2>The Company</h2>\r\n            <p>The T-Systems onsite is a 100% subsidiary of T-Systems International GmbH. \r\n              We provide IT development and consulting services in Germany.</p>\r\n          </div>\r\n        </ion-slide>\r\n\r\n        <ion-slide>\r\n          <div class=\"slide\">\r\n            <img src=\"assets/iotracer/Logos/InnovationLAB-WEST.png\"/>\r\n            <h2>InnoLab</h2>\r\n            <p>Our InnovationLAB basically focuses on three topics: Workshops, \r\n              research and development in innovative projects with internal and external customers.</p>\r\n          </div>\r\n        </ion-slide>\r\n\r\n        <ion-slide>\r\n          <div class=\"slide\">\r\n            <img src=\"assets/iotracer/onsite/box_onsite-erleben.jpg\"/>\r\n            <h2>Our Mission</h2>\r\n            <p>As part of Deutsche Telekom, we are developing into a leading, agile company.\r\n              Our teams apply their excellent IT and business process know-how with great passion\r\n              to create solutions with the best added value for our customers.</p>\r\n          </div>\r\n        </ion-slide>\r\n\r\n        <ion-slide>\r\n          <div class=\"slide\">\r\n            <img src=\"assets/iotracer/onsite/Ziele.png\"/>\r\n            <h2>Our Goals</h2>\r\n            <p>We are expanding our direct customer base on the external market and within Deutsche Telekom with a convincing range of services.</p>\r\n            <!--<p>We are constantly improving as an employer for our employees and applicants. Personal responsibility, equal opportunities and room for ideas characterize our work culture.</p>\r\n            <p>The quality of our work will inspire our customers - in every project and at every location equally.</p>-->\r\n          </div>\r\n        </ion-slide>\r\n\r\n        <ion-slide>\r\n          <img src=\"assets/iotracer/onsite/leitlinien.png\"/>\r\n          <h2>Our Guidelines</h2>\r\n          <p>Our group guidelines are a powerful tool.\r\n            They guide our behavior and actions, as well as represent our values and convictions.\r\n            Our guidelines provide principles that shape our corporate culture and create a \r\n            service mentality in which we believe.</p>\r\n        </ion-slide>\r\n        \r\n      </ion-slides>\r\n    \r\n    <div style=\"text-align: center; bottom: 0;\">\r\n      <a href=\"https://www.t-systems-onsite.de/\">\r\n        <ion-button id=\"linkhomepagebutton\" fill=\"clear\" color=\"primary\">For more information, <br>visit our homepage!<ion-icon slot=\"end\" name=\"arrow-forward\"></ion-icon></ion-button>\r\n      </a>\r\n    </div>\r\n\r\n  </ion-content>\r\n"

/***/ }),

/***/ "./src/app/pages/onsite/onsite.module.ts":
/*!***********************************************!*\
  !*** ./src/app/pages/onsite/onsite.module.ts ***!
  \***********************************************/
/*! exports provided: OnsitePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OnsitePageModule", function() { return OnsitePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _onsite_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./onsite.page */ "./src/app/pages/onsite/onsite.page.ts");







var routes = [
    {
        path: '',
        component: _onsite_page__WEBPACK_IMPORTED_MODULE_6__["OnsitePage"]
    }
];
var OnsitePageModule = /** @class */ (function () {
    function OnsitePageModule() {
    }
    OnsitePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
            ],
            declarations: [_onsite_page__WEBPACK_IMPORTED_MODULE_6__["OnsitePage"]]
        })
    ], OnsitePageModule);
    return OnsitePageModule;
}());



/***/ }),

/***/ "./src/app/pages/onsite/onsite.page.scss":
/*!***********************************************!*\
  !*** ./src/app/pages/onsite/onsite.page.scss ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":root {\n  --ion-safe-area-top: 20px;\n  --ion-safe-area-bottom: 22px;\n}\n\nion-slides {\n  height: auto;\n}\n\n.swiper-slide {\n  display: block;\n}\n\n.swiper-slide h2 {\n  margin-top: 2.8rem;\n}\n\n.swiper-slide img {\n  max-height: 50%;\n  max-width: 100%;\n  margin: 5% 0 1%;\n  pointer-events: none;\n}\n\nb {\n  font-weight: 500;\n}\n\np {\n  padding: 0 10px;\n  font-size: 16px;\n  line-height: 1.5;\n  color: var(--ion-color-step-600, #60646b);\n}\n\np b {\n  color: var(--ion-text-color, #000000);\n}\n\n#linkhomepagebutton {\n  font-size: 15px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvb25zaXRlL0M6XFxVc2Vyc1xcY3BpdHRlcnNcXERFVlxcR0lUXFxpb3QtcmFjZXItYml0YnVja2V0XFxvbnNpdGVyYWNlclxcT25TaXRlUmFjZXJfdjJcXEFwcFxcb25zaXRlLXJhY2VyLWlvbmljL3NyY1xcYXBwXFxwYWdlc1xcb25zaXRlXFxvbnNpdGUucGFnZS5zY3NzIiwic3JjL2FwcC9wYWdlcy9vbnNpdGUvb25zaXRlLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLHlCQUFBO0VBQ0EsNEJBQUE7QUNDSjs7QURFQTtFQUNJLFlBQUE7QUNDSjs7QURFRTtFQUNFLGNBQUE7QUNDSjs7QURFRTtFQUNFLGtCQUFBO0FDQ0o7O0FERUU7RUFDRSxlQUFBO0VBQ0EsZUFBQTtFQUNBLGVBQUE7RUFDQSxvQkFBQTtBQ0NKOztBREVFO0VBQ0UsZ0JBQUE7QUNDSjs7QURFRTtFQUNFLGVBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSx5Q0FBQTtBQ0NKOztBREVFO0VBQ0UscUNBQUE7QUNDSjs7QURFRTtFQUNFLGVBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL29uc2l0ZS9vbnNpdGUucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOnJvb3Qge1xyXG4gICAgLS1pb24tc2FmZS1hcmVhLXRvcDogMjBweDtcclxuICAgIC0taW9uLXNhZmUtYXJlYS1ib3R0b206IDIycHg7XHJcbiAgfVxyXG5cclxuaW9uLXNsaWRlcyB7XHJcbiAgICBoZWlnaHQ6IGF1dG87XHJcbiAgfVxyXG5cclxuICAuc3dpcGVyLXNsaWRlIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gIH1cclxuXHJcbiAgLnN3aXBlci1zbGlkZSBoMiB7XHJcbiAgICBtYXJnaW4tdG9wOiAyLjhyZW07XHJcbiAgfVxyXG5cclxuICAuc3dpcGVyLXNsaWRlIGltZyB7XHJcbiAgICBtYXgtaGVpZ2h0OiA1MCU7XHJcbiAgICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgICBtYXJnaW46IDUlIDAgMSU7XHJcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcclxuICB9XHJcblxyXG4gIGIge1xyXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICB9XHJcblxyXG4gIHAge1xyXG4gICAgcGFkZGluZzogMCAxMHB4O1xyXG4gICAgZm9udC1zaXplOiAxNnB4O1xyXG4gICAgbGluZS1oZWlnaHQ6IDEuNTtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3RlcC02MDAsICM2MDY0NmIpO1xyXG4gIH1cclxuXHJcbiAgcCBiIHtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tdGV4dC1jb2xvciwgIzAwMDAwMCk7XHJcbiAgfVxyXG5cclxuICAjbGlua2hvbWVwYWdlYnV0dG9ue1xyXG4gICAgZm9udC1zaXplOiAxNXB4O1xyXG4gIH1cclxuXHJcbiIsIjpyb290IHtcbiAgLS1pb24tc2FmZS1hcmVhLXRvcDogMjBweDtcbiAgLS1pb24tc2FmZS1hcmVhLWJvdHRvbTogMjJweDtcbn1cblxuaW9uLXNsaWRlcyB7XG4gIGhlaWdodDogYXV0bztcbn1cblxuLnN3aXBlci1zbGlkZSB7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4uc3dpcGVyLXNsaWRlIGgyIHtcbiAgbWFyZ2luLXRvcDogMi44cmVtO1xufVxuXG4uc3dpcGVyLXNsaWRlIGltZyB7XG4gIG1heC1oZWlnaHQ6IDUwJTtcbiAgbWF4LXdpZHRoOiAxMDAlO1xuICBtYXJnaW46IDUlIDAgMSU7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xufVxuXG5iIHtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbn1cblxucCB7XG4gIHBhZGRpbmc6IDAgMTBweDtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBsaW5lLWhlaWdodDogMS41O1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXN0ZXAtNjAwLCAjNjA2NDZiKTtcbn1cblxucCBiIHtcbiAgY29sb3I6IHZhcigtLWlvbi10ZXh0LWNvbG9yLCAjMDAwMDAwKTtcbn1cblxuI2xpbmtob21lcGFnZWJ1dHRvbiB7XG4gIGZvbnQtc2l6ZTogMTVweDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/pages/onsite/onsite.page.ts":
/*!*********************************************!*\
  !*** ./src/app/pages/onsite/onsite.page.ts ***!
  \*********************************************/
/*! exports provided: OnsitePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OnsitePage", function() { return OnsitePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var OnsitePage = /** @class */ (function () {
    /*slideOpts = {
      initialSlide: 1,
      speed: 400
    };*/
    function OnsitePage() {
    }
    OnsitePage.prototype.ngOnInit = function () {
    };
    OnsitePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-onsite',
            template: __webpack_require__(/*! raw-loader!./onsite.page.html */ "./node_modules/raw-loader/index.js!./src/app/pages/onsite/onsite.page.html"),
            styles: [__webpack_require__(/*! ./onsite.page.scss */ "./src/app/pages/onsite/onsite.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], OnsitePage);
    return OnsitePage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-onsite-onsite-module-es5.js.map