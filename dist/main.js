(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-module/app-routing.module.ts":
/*!**************************************************!*\
  !*** ./src/app/app-module/app-routing.module.ts ***!
  \**************************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var routes = [];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app-module/app.component.html":
/*!***********************************************!*\
  !*** ./src/app/app-module/app.component.html ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"content\">\r\n  <top-bar></top-bar>\r\n  \r\n  <!-- <mat-progress-bar mode=\"indeterminate\"></mat-progress-bar> -->\r\n  <!-- <router-outlet></router-outlet> -->\r\n  <div class=\"main-view\">\r\n    <div class=\"trading-view-container\">\r\n      <trading-view *ngFor=\"let symbol of config.availableSymbolsForInvesting\" [observableSymbol]=\"symbol.id\"></trading-view>\r\n    </div>\r\n    <div class=\"right-column\">\r\n      <order-table></order-table>\r\n    </div>\r\n\r\n    <!--<button (click)=\"stopWatching()\">Stop</button>-->\r\n    <!--<button (click)=\"getBalance()\">getBalance</button>-->\r\n    <!--<button (click)=\"getHistoryOrder()\">getHistoryOrder</button>-->\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/app-module/app.component.less":
/*!***********************************************!*\
  !*** ./src/app/app-module/app.component.less ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".content .main-view {\n  height: calc(100vh - 70px);\n  overflow-y: hidden;\n  display: flex;\n  align-items: center;\n  padding: 0 5px 0 10px;\n}\n.content .main-view .trading-view-container {\n  height: calc(100vh - 70px);\n  overflow-y: scroll;\n  width: 910px;\n}\n.content .main-view .right-column {\n  margin-left: auto;\n  width: calc(100vw - 850px);\n  height: 100%;\n  overflow-y: scroll;\n  padding: 40px 10px;\n}\n"

/***/ }),

/***/ "./src/app/app-module/app.component.ts":
/*!*********************************************!*\
  !*** ./src/app/app-module/app.component.ts ***!
  \*********************************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _investing_module_investing_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../investing-module/investing.service */ "./src/app/investing-module/investing.service.ts");
/* harmony import */ var _services_candle_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/candle.service */ "./src/app/services/candle.service.ts");
/* harmony import */ var _services_injectable_observables_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/injectable-observables.service */ "./src/app/services/injectable-observables.service.ts");
/* harmony import */ var _services_money_manager_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/money-manager.service */ "./src/app/services/money-manager.service.ts");
/* harmony import */ var _investing_module_strategies_abstractStrategy__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../investing-module/strategies/abstractStrategy */ "./src/app/investing-module/strategies/abstractStrategy.ts");
/* harmony import */ var _services_balance_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/balance.service */ "./src/app/services/balance.service.ts");
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var defaultConfig = {
    availableSymbolsForInvesting: [
        {
            id: 'ETHUSD',
            strategy: _investing_module_strategies_abstractStrategy__WEBPACK_IMPORTED_MODULE_5__["AvailableStrategies"].ThreeMAStrategy,
        },
        {
            id: 'BTCUSD',
            strategy: _investing_module_strategies_abstractStrategy__WEBPACK_IMPORTED_MODULE_5__["AvailableStrategies"].ThreeMAStrategy,
        },
        {
            id: 'LTCUSD',
            strategy: _investing_module_strategies_abstractStrategy__WEBPACK_IMPORTED_MODULE_5__["AvailableStrategies"].ThreeMAStrategy,
        },
        {
            id: 'ZECUSD',
            strategy: _investing_module_strategies_abstractStrategy__WEBPACK_IMPORTED_MODULE_5__["AvailableStrategies"].ThreeMAStrategy,
        },
    ],
    currentInvestingSymbol: 'BTCUSD',
    symbolInfo: {},
};
var AppComponent = /** @class */ (function () {
    function AppComponent(investingService, moneyManagerService, candleService, balanceService, injectableObservables) {
        var _this = this;
        this.investingService = investingService;
        this.moneyManagerService = moneyManagerService;
        this.candleService = candleService;
        this.balanceService = balanceService;
        this.injectableObservables = injectableObservables;
        this.config = __assign({}, defaultConfig);
        this.injectableObservables.config$.next(this.config);
        this.config.availableSymbolsForInvesting.forEach(function (symbol) {
            _this.candleService.connectToHitBtcApi(symbol.id);
        });
        this.injectableObservables.config$.subscribe(function (configUpdate) { return _this.config = __assign({}, _this.config, configUpdate); });
    }
    AppComponent.prototype.stopWatching = function () {
        this.investingService.stopWatching();
    };
    AppComponent.prototype.getBalance = function () {
        this.investingService.getBalance();
    };
    AppComponent.prototype.getHistoryOrder = function () {
        this.investingService.getHistoryOrder();
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app-module/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.less */ "./src/app/app-module/app.component.less")],
        }),
        __metadata("design:paramtypes", [_investing_module_investing_service__WEBPACK_IMPORTED_MODULE_1__["InvestingService"],
            _services_money_manager_service__WEBPACK_IMPORTED_MODULE_4__["MoneyManagerService"],
            _services_candle_service__WEBPACK_IMPORTED_MODULE_2__["CandleService"],
            _services_balance_service__WEBPACK_IMPORTED_MODULE_6__["BalanceService"],
            _services_injectable_observables_service__WEBPACK_IMPORTED_MODULE_3__["InjectableObservablesService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app-module/app.module.ts":
/*!******************************************!*\
  !*** ./src/app/app-module/app.module.ts ***!
  \******************************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_material___WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/ */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-module/app-routing.module.ts");
/* harmony import */ var _investing_module_investing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../investing-module/investing.module */ "./src/app/investing-module/investing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app.component */ "./src/app/app-module/app.component.ts");
/* harmony import */ var _components_chart_chart_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/chart/chart.component */ "./src/app/components/chart/chart.component.ts");
/* harmony import */ var _components_trading_view_trading_view_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/trading-view/trading-view.component */ "./src/app/components/trading-view/trading-view.component.ts");
/* harmony import */ var _services_injectable_observables_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../services/injectable-observables.service */ "./src/app/services/injectable-observables.service.ts");
/* harmony import */ var _components_order_table_order_table_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/order-table/order-table.component */ "./src/app/components/order-table/order-table.component.ts");
/* harmony import */ var _components_currency_currency_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../components/currency/currency.component */ "./src/app/components/currency/currency.component.ts");
/* harmony import */ var _components_top_bar_top_bar_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../components/top-bar/top-bar.component */ "./src/app/components/top-bar/top-bar.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"],
                _components_chart_chart_component__WEBPACK_IMPORTED_MODULE_8__["ChartComponent"],
                _components_trading_view_trading_view_component__WEBPACK_IMPORTED_MODULE_9__["TradingViewComponent"],
                _components_order_table_order_table_component__WEBPACK_IMPORTED_MODULE_11__["OrderTableComponent"],
                _components_currency_currency_component__WEBPACK_IMPORTED_MODULE_12__["CurrencyComponent"],
                _components_top_bar_top_bar_component__WEBPACK_IMPORTED_MODULE_13__["TopBarComponent"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_5__["AppRoutingModule"],
                _investing_module_investing_module__WEBPACK_IMPORTED_MODULE_6__["InvestingModule"],
                _angular_material___WEBPACK_IMPORTED_MODULE_4__["MatProgressBarModule"], _angular_material___WEBPACK_IMPORTED_MODULE_4__["MatButtonModule"], _angular_material___WEBPACK_IMPORTED_MODULE_4__["MatTableModule"]
            ],
            providers: [_services_injectable_observables_service__WEBPACK_IMPORTED_MODULE_10__["InjectableObservablesService"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"]],
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/components/chart/chart.component.html":
/*!*******************************************************!*\
  !*** ./src/app/components/chart/chart.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div [id]=\"'displayPlot' + chartID\"></div>\r\n"

/***/ }),

/***/ "./src/app/components/chart/chart.component.less":
/*!*******************************************************!*\
  !*** ./src/app/components/chart/chart.component.less ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/chart/chart.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/components/chart/chart.component.ts ***!
  \*****************************************************/
/*! exports provided: ChartComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChartComponent", function() { return ChartComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var plotly_js_dist__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! plotly.js-dist */ "./node_modules/plotly.js-dist/plotly.js");
/* harmony import */ var plotly_js_dist__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(plotly_js_dist__WEBPACK_IMPORTED_MODULE_1__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ChartComponent = /** @class */ (function () {
    function ChartComponent() {
        this.colorPalet = {};
    }
    ChartComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes['plots']) {
            this.plots = changes.plots.currentValue;
            this.plots.filter(function (plot) { return plot.type === 'scatter'; }).forEach(function (plot) { return plot.marker = { color: _this.getColor(plot.name) }; });
            this.plots.forEach(function (plot) { return plot.x = plot.x.map(function (xAxis) { return new Date(xAxis); }); });
            this.drawPlot(this.plots);
            this.adjustWidth();
        }
    };
    ChartComponent.prototype.drawPlot = function (plots) {
        var gridcolor = 'rgb(54, 60, 78)';
        var paperColor = 'rgb(19, 23, 34)';
        var axisColor = 'rgb(192, 192, 194)';
        if (!Object.keys(plots).length) {
            return;
        }
        var layout = {
            dragmode: 'zoom',
            height: 400,
            margin: {
                r: 10,
                t: 25,
                b: 40,
                l: 60,
            },
            paper_bgcolor: paperColor,
            plot_bgcolor: paperColor,
            showlegend: false,
            width: 700,
            xaxis: {
                autorange: true,
                gridcolor: gridcolor,
                rangeslider: { visible: false },
                tickcolor: axisColor,
                tickfont: {
                    color: axisColor,
                    size: 12,
                },
                type: 'date',
            },
            yaxis: {
                // dtick: 0.5,
                fixedrange: false,
                gridcolor: gridcolor,
                side: 'right',
                tickcolor: axisColor,
                tickfont: {
                    color: axisColor,
                    size: 18,
                },
            },
        };
        plotly_js_dist__WEBPACK_IMPORTED_MODULE_1___default.a.newPlot("displayPlot" + this.chartID, plots, layout);
    };
    ChartComponent.prototype.getColor = function (name) {
        var availableColors = ['rgb(58, 133, 173)', 'rgb(255, 0, 255)', 'rgb(238, 239, 2)', 'DarkMagenta', 'Chartreuse'];
        if (!this.colorPalet.hasOwnProperty(name)) {
            this.colorPalet[name] = Object.keys(this.colorPalet).length % availableColors.length;
        }
        return availableColors[this.colorPalet[name]];
    };
    ChartComponent.prototype.adjustWidth = function () {
        var svgElements = document.getElementsByClassName('main-svg');
        [].forEach.call(svgElements, function (svgElement) {
            svgElement.attributes.width.value = 800;
        });
    };
    ChartComponent.prototype.convertTimeToCurrentTimezone = function (candle) {
        return new Date(candle.timestamp);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ChartComponent.prototype, "plots", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ChartComponent.prototype, "chartID", void 0);
    ChartComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'chart',
            template: __webpack_require__(/*! ./chart.component.html */ "./src/app/components/chart/chart.component.html"),
            styles: [__webpack_require__(/*! ./chart.component.less */ "./src/app/components/chart/chart.component.less")],
        })
    ], ChartComponent);
    return ChartComponent;
}());



/***/ }),

/***/ "./src/app/components/currency/currency.component.html":
/*!*************************************************************!*\
  !*** ./src/app/components/currency/currency.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"mat-raised-button\">\r\n  {{currencyBalance.currency}}:\r\n  {{currencyBalance.available | number:'1.1-5'}}\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/components/currency/currency.component.less":
/*!*************************************************************!*\
  !*** ./src/app/components/currency/currency.component.less ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/currency/currency.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/components/currency/currency.component.ts ***!
  \***********************************************************/
/*! exports provided: CurrencyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurrencyComponent", function() { return CurrencyComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _models_CurrencyBalance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/CurrencyBalance */ "./src/app/models/CurrencyBalance.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CurrencyComponent = /** @class */ (function () {
    function CurrencyComponent() {
    }
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _models_CurrencyBalance__WEBPACK_IMPORTED_MODULE_1__["CurrencyBalance"])
    ], CurrencyComponent.prototype, "currencyBalance", void 0);
    CurrencyComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'currency',
            template: __webpack_require__(/*! ./currency.component.html */ "./src/app/components/currency/currency.component.html"),
            styles: [__webpack_require__(/*! ./currency.component.less */ "./src/app/components/currency/currency.component.less")],
        }),
        __metadata("design:paramtypes", [])
    ], CurrencyComponent);
    return CurrencyComponent;
}());



/***/ }),

/***/ "./src/app/components/order-table/order-table.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/components/order-table/order-table.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"mat-elevation-z8\">\r\n  <table mat-table [dataSource]=\"dataSource\">\r\n\r\n    <!-- Position Column -->\r\n    <ng-container matColumnDef=\"position\">\r\n      <th mat-header-cell *matHeaderCellDef> No. </th>\r\n      <td mat-cell *matCellDef=\"let element\"> {{element.position}} </td>\r\n    </ng-container>\r\n\r\n    <!-- Name Column -->\r\n    <ng-container matColumnDef=\"name\">\r\n      <th mat-header-cell *matHeaderCellDef> Name </th>\r\n      <td mat-cell *matCellDef=\"let element\"> {{element.name}} </td>\r\n    </ng-container>\r\n\r\n    <!-- Weight Column -->\r\n    <ng-container matColumnDef=\"weight\">\r\n      <th mat-header-cell *matHeaderCellDef> Weight </th>\r\n      <td mat-cell *matCellDef=\"let element\"> {{element.weight}} </td>\r\n    </ng-container>\r\n\r\n    <!-- Symbol Column -->\r\n    <ng-container matColumnDef=\"symbol\">\r\n      <th mat-header-cell *matHeaderCellDef> Symbol </th>\r\n      <td mat-cell *matCellDef=\"let element\"> {{element.symbol}} </td>\r\n    </ng-container>\r\n\r\n    <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\r\n    <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\r\n  </table>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/components/order-table/order-table.component.less":
/*!*******************************************************************!*\
  !*** ./src/app/components/order-table/order-table.component.less ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n  width: 100%;\n}\n"

/***/ }),

/***/ "./src/app/components/order-table/order-table.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/components/order-table/order-table.component.ts ***!
  \*****************************************************************/
/*! exports provided: OrderTableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderTableComponent", function() { return OrderTableComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var OrderTableComponent = /** @class */ (function () {
    function OrderTableComponent() {
        this.displayedColumns = ['position', 'name', 'weight', 'symbol'];
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](ELEMENT_DATA);
    }
    OrderTableComponent.prototype.ngOnInit = function () {
        this.dataSource.paginator = this.paginator;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"])
    ], OrderTableComponent.prototype, "paginator", void 0);
    OrderTableComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'order-table',
            template: __webpack_require__(/*! ./order-table.component.html */ "./src/app/components/order-table/order-table.component.html"),
            styles: [__webpack_require__(/*! ./order-table.component.less */ "./src/app/components/order-table/order-table.component.less")],
        })
    ], OrderTableComponent);
    return OrderTableComponent;
}());

var ELEMENT_DATA = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
    { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
    { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
    { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
    { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
    { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
    { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
    { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
    { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
    { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
    { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];


/***/ }),

/***/ "./src/app/components/top-bar/top-bar.component.html":
/*!***********************************************************!*\
  !*** ./src/app/components/top-bar/top-bar.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\r\n  <div class=\"align\">\r\n    <div class=\"currency-wrapper\">\r\n      <currency *ngFor=\"let currencyBalance of balanceList\" [currencyBalance]=\"currencyBalance\"></currency>\r\n    </div>\r\n    <nav>\r\n      <a mat-raised-button routerLink=\"/trading\" routerLinkActive=\"active\">Trading</a>\r\n      <a mat-raised-button routerLink=\"/statistics\" routerLinkActive=\"active\">Statistics</a>\r\n    </nav>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/components/top-bar/top-bar.component.less":
/*!***********************************************************!*\
  !*** ./src/app/components/top-bar/top-bar.component.less ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".align {\n  display: flex;\n  width: 1600px;\n}\n.wrapper {\n  background-color: #3f51b5;\n  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);\n  display: flex;\n  height: 56px;\n  justify-content: space-around;\n  padding: 0 20px;\n}\n.wrapper .align {\n  justify-content: space-between;\n  -ms-grid-row-align: center;\n      align-self: center;\n}\n.wrapper .align .currency-wrapper {\n  display: flex;\n  justify-content: space-between;\n  width: 100%;\n}\n.wrapper .align h1 {\n  -ms-grid-row-align: center;\n      align-self: center;\n  color: #fff;\n  font-size: 28px;\n  margin: 0 20px;\n}\n.wrapper .align nav {\n  align-items: center;\n  display: flex;\n}\n.wrapper .align nav a {\n  margin: 0 8px;\n}\n"

/***/ }),

/***/ "./src/app/components/top-bar/top-bar.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/components/top-bar/top-bar.component.ts ***!
  \*********************************************************/
/*! exports provided: TopBarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TopBarComponent", function() { return TopBarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_injectable_observables_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/injectable-observables.service */ "./src/app/services/injectable-observables.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TopBarComponent = /** @class */ (function () {
    function TopBarComponent(injectableObservables) {
        var _this = this;
        this.injectableObservables = injectableObservables;
        this.balanceList = [];
        injectableObservables.balance$.subscribe(function (balanceUpdate) { return _this.handleBalanceUpdate(balanceUpdate); });
    }
    TopBarComponent.prototype.handleBalanceUpdate = function (balance) {
        this.balanceList = balance;
    };
    TopBarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'top-bar',
            styles: [__webpack_require__(/*! ./top-bar.component.less */ "./src/app/components/top-bar/top-bar.component.less")],
            template: __webpack_require__(/*! ./top-bar.component.html */ "./src/app/components/top-bar/top-bar.component.html"),
        }),
        __metadata("design:paramtypes", [_services_injectable_observables_service__WEBPACK_IMPORTED_MODULE_1__["InjectableObservablesService"]])
    ], TopBarComponent);
    return TopBarComponent;
}());



/***/ }),

/***/ "./src/app/components/trading-view/trading-view.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/components/trading-view/trading-view.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\r\n   <mat-progress-bar *ngIf=\"!plots.length\" mode=\"indeterminate\"></mat-progress-bar>\r\n  <chart [plots]=\"plots\" [chartID]=\"observableSymbol\"></chart>\r\n  <div class=\"observable-symbol\">{{observableSymbol}}</div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/components/trading-view/trading-view.component.less":
/*!*********************************************************************!*\
  !*** ./src/app/components/trading-view/trading-view.component.less ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".wrapper {\n  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.1);\n  margin: 10px;\n  padding: 10px;\n}\n.wrapper .observable-symbol {\n  text-align: center;\n  padding-top: 10px;\n  font-weight: bolder;\n}\n"

/***/ }),

/***/ "./src/app/components/trading-view/trading-view.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/components/trading-view/trading-view.component.ts ***!
  \*******************************************************************/
/*! exports provided: TradingViewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TradingViewComponent", function() { return TradingViewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _models_ChartFormats_CandlesChartFormat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/ChartFormats/CandlesChartFormat */ "./src/app/models/ChartFormats/CandlesChartFormat.ts");
/* harmony import */ var _services_injectable_observables_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/injectable-observables.service */ "./src/app/services/injectable-observables.service.ts");
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TradingViewComponent = /** @class */ (function () {
    function TradingViewComponent(injectableObservables) {
        var _this = this;
        this.savedCandles = [];
        this.savedIndicators = {};
        this.plots = [];
        injectableObservables.candles$.subscribe(function (candlesUpdate) { return _this.handleCandlesUpdate(candlesUpdate); }, function (e) { return _this.handleError(e); }, function () { return _this.handleOnComplete(); });
        injectableObservables.indicator$.subscribe(function (indicatorsUpdate) { return _this.handleIndicatorsUpdate(indicatorsUpdate); }, function (e) { return _this.handleError(e); }, function () { return _this.handleOnComplete(); });
    }
    TradingViewComponent.prototype.handleCandlesUpdate = function (newCandles) {
        var candles = newCandles[this.observableSymbol] || [];
        this.savedCandles = candles.slice();
        this.reDrawPlots();
    };
    TradingViewComponent.prototype.handleIndicatorsUpdate = function (indicators) {
        this.savedIndicators = __assign({}, indicators[this.observableSymbol]);
        this.reDrawPlots();
    };
    TradingViewComponent.prototype.reDrawPlots = function () {
        var viewingAmount = 35;
        var indicators = Object.values(this.savedIndicators);
        indicators.forEach(function (indicator) {
            indicator.x = indicator.x.slice(-viewingAmount);
            indicator.y = indicator.y.slice(-viewingAmount);
        });
        var showingCandles = this.mapCandleToChartFormat(this.savedCandles.slice(-viewingAmount));
        this.plots = [showingCandles].concat(indicators);
    };
    TradingViewComponent.prototype.mapCandleToChartFormat = function (candles) {
        return Object.assign(new _models_ChartFormats_CandlesChartFormat__WEBPACK_IMPORTED_MODULE_1__["CandlesChartFormat"](), {
            x: candles.map(function (candle) { return candle.timestamp; }),
            open: candles.map(function (candle) { return candle.open; }),
            close: candles.map(function (candle) { return candle.close; }),
            high: candles.map(function (candle) { return candle.max; }),
            low: candles.map(function (candle) { return candle.min; }),
        });
    };
    TradingViewComponent.prototype.handleError = function (e) {
        console.error('Error in TradingViewComponent in injectableObservables:', e);
    };
    TradingViewComponent.prototype.handleOnComplete = function () {
        console.log('InjectableObservablesService onCompleted');
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], TradingViewComponent.prototype, "observableSymbol", void 0);
    TradingViewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'trading-view',
            template: __webpack_require__(/*! ./trading-view.component.html */ "./src/app/components/trading-view/trading-view.component.html"),
            styles: [__webpack_require__(/*! ./trading-view.component.less */ "./src/app/components/trading-view/trading-view.component.less")],
        }),
        __metadata("design:paramtypes", [_services_injectable_observables_service__WEBPACK_IMPORTED_MODULE_2__["InjectableObservablesService"]])
    ], TradingViewComponent);
    return TradingViewComponent;
}());



/***/ }),

/***/ "./src/app/crypto-exchange-module/hitbtc-api.service.ts":
/*!**************************************************************!*\
  !*** ./src/app/crypto-exchange-module/hitbtc-api.service.ts ***!
  \**************************************************************/
/*! exports provided: HitBTCApi */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HitBTCApi", function() { return HitBTCApi; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _libs_ws_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../libs/ws.service */ "./src/libs/ws.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _services_injectable_observables_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/injectable-observables.service */ "./src/app/services/injectable-observables.service.ts");
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var socketURL = 'wss://api.hitbtc.com/api/2/ws';
var backendPoint = 'http://localhost:8080/backend';
var restEndPoint = 'https://api.hitbtc.com/api/2/public';
var HitBTCApi = /** @class */ (function () {
    function HitBTCApi(http, injectableObservables) {
        var _this = this;
        this.http = http;
        this.injectableObservables = injectableObservables;
        this.ws = {};
        this.period = 'M1';
        this.config = {};
        console.log('HitBTCApi working');
        this.injectableObservables.config$.subscribe(function (configUpdate) {
            _this.config = __assign({}, configUpdate);
            _this.requiredCurrencies = Object.values(_this.config.symbolInfo)
                .reduce(function (array, symbolInfo) { return array.concat([symbolInfo.baseCurrency, symbolInfo.quoteCurrency]); }, []);
        });
    }
    HitBTCApi.prototype.createConnection = function (symbol) {
        console.log('create connection');
        this.ws[symbol] = new _libs_ws_service__WEBPACK_IMPORTED_MODULE_2__["WSService"](socketURL);
    };
    HitBTCApi.prototype.subscribeCandles = function (symbol, period) {
        if (period === void 0) { period = this.period; }
        this.ws[symbol].send({
            method: 'subscribeCandles',
            params: {
                symbol: symbol,
                period: period,
            },
            id: 123,
        });
    };
    HitBTCApi.prototype.subscribeTrades = function (symbol) {
        this.ws[symbol].send({
            method: 'subscribeTrades',
            params: {
                symbol: symbol,
            },
            id: 123,
        });
    };
    HitBTCApi.prototype.getSymbolDescription = function (symbol) {
        return this.http.get(backendPoint + "/symbol/" + symbol)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (response) { return console.log("Backend response getSymbolDescription: \n " + response); }));
    };
    HitBTCApi.prototype.getOrderbook = function (symbol) {
        return this.http.get(backendPoint + "/getOrderbook/" + symbol)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (response) { return console.log("Backend response getOrderbook: \n " + response); }));
    };
    HitBTCApi.prototype.onMessage = function (symbol) {
        return this.ws[symbol].onMessage();
    };
    HitBTCApi.prototype.closeConnection = function (symbol, delay) {
        var _this = this;
        if (delay === void 0) { delay = 0; }
        if (symbol) {
            setTimeout(function () { return _this.ws[symbol].closeConnection(); }, delay);
        }
        else {
            Object.values(this.ws).forEach(function (wsConnection) { return wsConnection.closeConnection(); });
        }
    };
    HitBTCApi.prototype.getBalance = function () {
        var _this = this;
        return this.http.get(backendPoint + "/trading/balance")
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) { return JSON.parse(response)
            .filter(function (currency) {
            return !!(_this.requiredCurrencies.includes(currency.currency) || +currency.available || +currency.reserved);
        }); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (response) { return console.log("Backend response getBalance: \n " + response); }));
    };
    HitBTCApi.prototype.getHistoryOrder = function () {
        return this.http.get(backendPoint + "/history/order")
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) { return JSON.parse(response); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (response) { return console.log("Backend response getHistoryOrder: \n " + response); }));
    };
    HitBTCApi = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root',
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"],
            _services_injectable_observables_service__WEBPACK_IMPORTED_MODULE_4__["InjectableObservablesService"]])
    ], HitBTCApi);
    return HitBTCApi;
}());



/***/ }),

/***/ "./src/app/investing-module/indicators/ma.ts":
/*!***************************************************!*\
  !*** ./src/app/investing-module/indicators/ma.ts ***!
  \***************************************************/
/*! exports provided: MA */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MA", function() { return MA; });
var MA = /** @class */ (function () {
    function MA(period) {
        if (period === void 0) { period = 9; }
        this.period = period;
    }
    MA.prototype.calculate = function (prices) {
        return prices.slice(-this.period).reduce(function (total, value) { return total + value; }) / this.period;
    };
    return MA;
}());



/***/ }),

/***/ "./src/app/investing-module/investing.module.ts":
/*!******************************************************!*\
  !*** ./src/app/investing-module/investing.module.ts ***!
  \******************************************************/
/*! exports provided: InvestingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvestingModule", function() { return InvestingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _investing_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./investing.service */ "./src/app/investing-module/investing.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var InvestingModule = /** @class */ (function () {
    function InvestingModule() {
    }
    InvestingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            ],
            providers: [_investing_service__WEBPACK_IMPORTED_MODULE_2__["InvestingService"]],
        })
    ], InvestingModule);
    return InvestingModule;
}());



/***/ }),

/***/ "./src/app/investing-module/investing.service.ts":
/*!*******************************************************!*\
  !*** ./src/app/investing-module/investing.service.ts ***!
  \*******************************************************/
/*! exports provided: InvestingService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvestingService", function() { return InvestingService; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _crypto_exchange_module_hitbtc_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../crypto-exchange-module/hitbtc-api.service */ "./src/app/crypto-exchange-module/hitbtc-api.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_injectable_observables_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/injectable-observables.service */ "./src/app/services/injectable-observables.service.ts");
/* harmony import */ var _models_SharedConstants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../models/SharedConstants */ "./src/app/models/SharedConstants.ts");
/* harmony import */ var _strategies_ThreeMA_strategy__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./strategies/ThreeMA.strategy */ "./src/app/investing-module/strategies/ThreeMA.strategy.ts");
/* harmony import */ var _services_indicator_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/indicator.service */ "./src/app/services/indicator.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var InvestingService = /** @class */ (function () {
    function InvestingService(injectableObservables, indicatorService, hitBTCApiService) {
        var _this = this;
        this.injectableObservables = injectableObservables;
        this.indicatorService = indicatorService;
        this.hitBTCApiService = hitBTCApiService;
        this.actualOpenTime = null;
        this.openedTrade = null;
        this.money = 1000;
        this.config = {};
        this.savedAdvice = {};
        console.log('InvestingService working');
        this.injectableObservables.config$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["first"])())
            .subscribe(function (config) { return _this.handleConfigUpdate(config); });
        this.injectableObservables.positionAction$.subscribe(function (actionUpdate) { return _this.handleActionUpdate(actionUpdate); });
        this.injectableObservables.moneyAction$.subscribe(function (moneyUpdate) { return _this.handleMoneyUpdate(moneyUpdate); });
    }
    InvestingService.prototype.handleConfigUpdate = function (config) {
        var _this = this;
        this.config = config;
        config.availableSymbolsForInvesting.forEach(function (symbol) {
            _this.createStrategyInstance(symbol);
        });
    };
    InvestingService.prototype.handleMoneyUpdate = function (moneyUpdate) {
        if (!moneyUpdate.amount) {
            return;
        }
        else if (!this.savedAdvice[moneyUpdate.symbolID] ||
            this.savedAdvice[moneyUpdate.symbolID].advisedResult !== moneyUpdate.advisedResult ||
            +new Date(moneyUpdate.timestamp) !== +new Date(this.savedAdvice[moneyUpdate.symbolID].timestamp)) {
            this.savedAdvice[moneyUpdate.symbolID] = moneyUpdate;
            console.log(this.savedAdvice);
        }
    };
    InvestingService.prototype.createStrategyInstance = function (symbol) {
        var StrategyConstructor;
        switch (symbol.strategy) {
            case 'ThreeMAStrategy':
                StrategyConstructor = _strategies_ThreeMA_strategy__WEBPACK_IMPORTED_MODULE_5__["ThreeMAStrategy"];
                break;
        }
        return new StrategyConstructor(symbol.id, this.injectableObservables, this.indicatorService);
    };
    InvestingService.prototype.handleActionUpdate = function (action) {
        var _this = this;
        // console.log(action);
        this.hitBTCApiService.getOrderbook(this.config.investingSymbol).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["first"])()).subscribe(function (orderbook) {
            console.log(orderbook);
            if (action.side === _models_SharedConstants__WEBPACK_IMPORTED_MODULE_4__["Side"].buy && !_this.openedTrade && !_this.actualOpenTime) {
                _this.actualOpenTime = new Date(action.time);
                _this.actualOpenTime.setMinutes(_this.actualOpenTime.getMinutes() + _this.config.shiftForOpening);
            }
            else if (+_this.actualOpenTime === +new Date(action.time)) {
                _this.openPosition(action.time, +orderbook.bid[0].price);
            }
            else if (action.side === _models_SharedConstants__WEBPACK_IMPORTED_MODULE_4__["Side"].sell && _this.openedTrade) {
                _this.closePosition(action.time, +orderbook.ask[0].price);
            }
            else if (_this.shouldBeClosedEarly(+orderbook.ask[0].price)) {
                _this.closePosition(action.time, +orderbook.ask[0].price);
            }
        });
    };
    InvestingService.prototype.openPosition = function (time, bidPrice) {
        console.log('Open: ' + time);
        var openPrice = bidPrice - this.config.tickSize * 2;
        this.openedTrade = {
            time: time,
            openPrice: openPrice,
            value: this.money / openPrice,
        };
        console.log(this.openedTrade);
        this.actualOpenTime = null;
    };
    InvestingService.prototype.closePosition = function (time, askPrice) {
        console.log('Close: ' + time);
        var closePrice = askPrice + this.config.tickSize * 2;
        this.money = this.openedTrade.value * closePrice;
        this.openedTrade = null;
        console.log(this.money);
    };
    InvestingService.prototype.shouldBeClosedEarly = function (askPrice) {
        if (!this.openedTrade) {
            return false;
        }
        var openPrice = this.openedTrade.openPrice;
        if ((openPrice - askPrice) / openPrice > this.config.allowedLost ||
            (askPrice - openPrice) / openPrice > this.config.enoughProfit) {
            console.log('Closing due to > allowedLost of enoughProfit');
            return true;
        }
        return true;
    };
    InvestingService.prototype.stopWatching = function () {
        this.hitBTCApiService.closeConnection();
    };
    InvestingService.prototype.getBalance = function () {
        this.hitBTCApiService.getBalance().subscribe(function (res) {
            console.log(res);
        });
    };
    InvestingService.prototype.getHistoryOrder = function () {
        this.hitBTCApiService.getHistoryOrder().subscribe(function (res) {
            console.log(res);
        });
    };
    InvestingService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])({
            providedIn: 'root',
        }),
        __metadata("design:paramtypes", [_services_injectable_observables_service__WEBPACK_IMPORTED_MODULE_3__["InjectableObservablesService"],
            _services_indicator_service__WEBPACK_IMPORTED_MODULE_6__["IndicatorService"],
            _crypto_exchange_module_hitbtc_api_service__WEBPACK_IMPORTED_MODULE_1__["HitBTCApi"]])
    ], InvestingService);
    return InvestingService;
}());



/***/ }),

/***/ "./src/app/investing-module/strategies/ThreeMA.strategy.ts":
/*!*****************************************************************!*\
  !*** ./src/app/investing-module/strategies/ThreeMA.strategy.ts ***!
  \*****************************************************************/
/*! exports provided: ThreeMAStrategy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThreeMAStrategy", function() { return ThreeMAStrategy; });
/* harmony import */ var _models_SharedConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/SharedConstants */ "./src/app/models/SharedConstants.ts");
/* harmony import */ var _indicators_ma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../indicators/ma */ "./src/app/investing-module/indicators/ma.ts");


var ThreeMAStrategy = /** @class */ (function () {
    function ThreeMAStrategy(symbolID, injectableObservables, indicatorService) {
        var _this = this;
        this.symbolID = symbolID;
        this.injectableObservables = injectableObservables;
        this.indicatorService = indicatorService;
        this.field = 'close';
        this.MAShort = new _indicators_ma__WEBPACK_IMPORTED_MODULE_1__["MA"](9);
        this.MAMiddle = new _indicators_ma__WEBPACK_IMPORTED_MODULE_1__["MA"](13);
        this.MALong = new _indicators_ma__WEBPACK_IMPORTED_MODULE_1__["MA"](21);
        console.log('Strategy ThreeMAStrategy started');
        injectableObservables.candles$.subscribe(function (candlesUpdate) { return _this.handleCandlesUpdate(candlesUpdate); });
    }
    ThreeMAStrategy.prototype.handleCandlesUpdate = function (candlesUpdate) {
        // console.log(`${this.symbolID} - ${this.timestamp}`);
        // console.log(candlesUpdate);
        var candles = candlesUpdate[this.symbolID] || [];
        if (!candles.length) {
            return;
        }
        this.timestamp = candles[candles.length - 1].timestamp;
        var advisedResult = this.advisedInvestingSide(candles);
        this.injectableObservables.strategyAction$.next({
            symbolID: this.symbolID,
            advisedResult: advisedResult,
            timestamp: this.timestamp,
        });
    };
    ThreeMAStrategy.prototype.advisedInvestingSide = function (candles, isPartOfStrategy) {
        var _this = this;
        var prices = candles.map(function (candle) { return +candle[_this.field]; });
        var shortValue = this.MAShort.calculate(prices);
        var middleValue = this.MAMiddle.calculate(prices);
        var longValue = this.MALong.calculate(prices);
        this.updateLastValue(shortValue, middleValue, longValue);
        var _a = this.indicatorService.getIndicatorValue(this.symbolID, 2).values, prevShort = _a.MAShort, prevMiddle = _a.MAMiddle, prevLong = _a.MALong;
        if ((prevLong.value > prevShort.value && longValue < shortValue) ||
            (isPartOfStrategy && longValue < shortValue)) {
            return _models_SharedConstants__WEBPACK_IMPORTED_MODULE_0__["Side"].buy;
        }
        else if (+candles[candles.length - 1].min < prevMiddle.value) {
            return _models_SharedConstants__WEBPACK_IMPORTED_MODULE_0__["Side"].sell;
        }
        else {
            return _models_SharedConstants__WEBPACK_IMPORTED_MODULE_0__["Side"].none;
        }
    };
    ThreeMAStrategy.prototype.updateLastValue = function (shortValue, middleValue, longValue) {
        this.indicatorService.handleIndicatorsUpdate({
            symbolID: this.symbolID,
            values: {
                MAShort: {
                    value: shortValue,
                    timestamp: this.timestamp,
                },
                MAMiddle: {
                    value: middleValue,
                    timestamp: this.timestamp,
                },
                MALong: {
                    value: longValue,
                    timestamp: this.timestamp,
                },
            },
        });
    };
    return ThreeMAStrategy;
}());



/***/ }),

/***/ "./src/app/investing-module/strategies/abstractStrategy.ts":
/*!*****************************************************************!*\
  !*** ./src/app/investing-module/strategies/abstractStrategy.ts ***!
  \*****************************************************************/
/*! exports provided: AvailableStrategies, Strategy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AvailableStrategies", function() { return AvailableStrategies; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Strategy", function() { return Strategy; });
var AvailableStrategies;
(function (AvailableStrategies) {
    AvailableStrategies["ThreeMAStrategy"] = "ThreeMAStrategy";
})(AvailableStrategies || (AvailableStrategies = {}));
var Strategy = /** @class */ (function () {
    function Strategy() {
    }
    return Strategy;
}());



/***/ }),

/***/ "./src/app/models/ChartFormats/CandlesChartFormat.ts":
/*!***********************************************************!*\
  !*** ./src/app/models/ChartFormats/CandlesChartFormat.ts ***!
  \***********************************************************/
/*! exports provided: CandlesChartFormat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CandlesChartFormat", function() { return CandlesChartFormat; });
/* harmony import */ var _ChartFormat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ChartFormat */ "./src/app/models/ChartFormats/ChartFormat.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var CandlesChartFormat = /** @class */ (function (_super) {
    __extends(CandlesChartFormat, _super);
    function CandlesChartFormat() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.decreasing = { line: { color: 'rgb(235, 77, 92)' } };
        _this.increasing = { line: { color: 'rgb(83, 185, 135)' } };
        _this.line = { color: 'rgba(31,119,180,1)' };
        _this.type = 'candlestick';
        _this.name = '';
        _this.xaxis = 'x';
        _this.yaxis = 'y';
        return _this;
    }
    return CandlesChartFormat;
}(_ChartFormat__WEBPACK_IMPORTED_MODULE_0__["ChartFormat"]));



/***/ }),

/***/ "./src/app/models/ChartFormats/ChartFormat.ts":
/*!****************************************************!*\
  !*** ./src/app/models/ChartFormats/ChartFormat.ts ***!
  \****************************************************/
/*! exports provided: ChartFormat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChartFormat", function() { return ChartFormat; });
var ChartFormat = /** @class */ (function () {
    function ChartFormat() {
        this.name = '';
    }
    return ChartFormat;
}());



/***/ }),

/***/ "./src/app/models/ChartFormats/ScatterChartFormat.ts":
/*!***********************************************************!*\
  !*** ./src/app/models/ChartFormats/ScatterChartFormat.ts ***!
  \***********************************************************/
/*! exports provided: ScatterChartFormat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScatterChartFormat", function() { return ScatterChartFormat; });
/* harmony import */ var _ChartFormat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ChartFormat */ "./src/app/models/ChartFormats/ChartFormat.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var ScatterChartFormat = /** @class */ (function (_super) {
    __extends(ScatterChartFormat, _super);
    function ScatterChartFormat() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.x = [];
        _this.y = [];
        _this.type = 'scatter';
        _this.name = '';
        return _this;
    }
    return ScatterChartFormat;
}(_ChartFormat__WEBPACK_IMPORTED_MODULE_0__["ChartFormat"]));



/***/ }),

/***/ "./src/app/models/CurrencyBalance.ts":
/*!*******************************************!*\
  !*** ./src/app/models/CurrencyBalance.ts ***!
  \*******************************************/
/*! exports provided: CurrencyBalance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurrencyBalance", function() { return CurrencyBalance; });
var CurrencyBalance = /** @class */ (function () {
    function CurrencyBalance() {
    }
    return CurrencyBalance;
}());



/***/ }),

/***/ "./src/app/models/SharedConstants.ts":
/*!*******************************************!*\
  !*** ./src/app/models/SharedConstants.ts ***!
  \*******************************************/
/*! exports provided: Side, Status, Period */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Side", function() { return Side; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Status", function() { return Status; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Period", function() { return Period; });
var Side;
(function (Side) {
    Side["buy"] = "buy";
    Side["sell"] = "sell";
    Side["none"] = "none";
})(Side || (Side = {}));
var Status;
(function (Status) {
    Status["OPENED"] = "OPENED";
    Status["CLOSED"] = "CLOSED";
})(Status || (Status = {}));
var Period;
(function (Period) {
    Period["M1"] = "M1";
    Period["M3"] = "M3";
    Period["M5"] = "M5";
    Period["M15"] = "M15";
    Period["M30"] = "M30";
    Period["H1"] = "H1";
    Period["H4"] = "H4";
    Period["D1"] = "D1";
    Period["D7"] = "D7";
})(Period || (Period = {}));


/***/ }),

/***/ "./src/app/services/balance.service.ts":
/*!*********************************************!*\
  !*** ./src/app/services/balance.service.ts ***!
  \*********************************************/
/*! exports provided: BalanceService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BalanceService", function() { return BalanceService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _injectable_observables_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./injectable-observables.service */ "./src/app/services/injectable-observables.service.ts");
/* harmony import */ var _crypto_exchange_module_hitbtc_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../crypto-exchange-module/hitbtc-api.service */ "./src/app/crypto-exchange-module/hitbtc-api.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var BalanceService = /** @class */ (function () {
    function BalanceService(injectableObservables, hitBTCApiService) {
        var _this = this;
        this.injectableObservables = injectableObservables;
        this.hitBTCApiService = hitBTCApiService;
        this.balanceList = [];
        this.injectableObservables.config$.subscribe(function () { return _this.onConfigUpdate(); });
        // setInterval(() => {
        //   const newobj = this.balanceList;
        //   let v = +newobj[4].available;
        //   v += 1;
        //   newobj[4].available = v.toString();
        //   this.updateBalanceList(newobj);
        // }, 2000);
    }
    BalanceService.prototype.onConfigUpdate = function () {
        var _this = this;
        this.hitBTCApiService.getBalance().subscribe(function (balanceValues) { return _this.updateBalanceList(balanceValues); });
    };
    BalanceService.prototype.updateBalanceList = function (newBalance) {
        this.balanceList = newBalance.sort(function (value1, value2) { return +value2.available - +value1.available; });
        this.notifyAboutNewBalanceValue();
    };
    BalanceService.prototype.notifyAboutNewBalanceValue = function () {
        this.injectableObservables.balance$.next(this.balanceList);
    };
    BalanceService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root',
        }),
        __metadata("design:paramtypes", [_injectable_observables_service__WEBPACK_IMPORTED_MODULE_1__["InjectableObservablesService"],
            _crypto_exchange_module_hitbtc_api_service__WEBPACK_IMPORTED_MODULE_2__["HitBTCApi"]])
    ], BalanceService);
    return BalanceService;
}());



/***/ }),

/***/ "./src/app/services/candle.service.ts":
/*!********************************************!*\
  !*** ./src/app/services/candle.service.ts ***!
  \********************************************/
/*! exports provided: CandleService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CandleService", function() { return CandleService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _injectable_observables_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./injectable-observables.service */ "./src/app/services/injectable-observables.service.ts");
/* harmony import */ var _crypto_exchange_module_hitbtc_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../crypto-exchange-module/hitbtc-api.service */ "./src/app/crypto-exchange-module/hitbtc-api.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CandleService = /** @class */ (function () {
    function CandleService(injectableObservables, cryptoExchangeService) {
        this.injectableObservables = injectableObservables;
        this.cryptoExchangeService = cryptoExchangeService;
        this.savedCandles = {};
        this.count = {};
    }
    CandleService.prototype.connectToHitBtcApi = function (symbol) {
        var _this = this;
        this.count[symbol] = 0;
        this.cryptoExchangeService.createConnection(symbol);
        this.cryptoExchangeService.subscribeCandles(symbol);
        this.cryptoExchangeService.onMessage(symbol)
            .subscribe(function (message) {
            switch (message.method) {
                case 'snapshotCandles':
                    console.log('snapshotCandles');
                    _this.savedCandles[message.params.symbol] = message.params.data.slice();
                    break;
                case 'updateCandles':
                    //console.log(`${symbol} - updateCandles - ${this.count[symbol]++}`);
                    _this.updateSavedCandles(message);
                    break;
                default:
                    if (!message.result) {
                        console.error('Cant handle unknown method');
                        console.error(message);
                    }
                    break;
            }
        });
    };
    CandleService.prototype.updateSavedCandles = function (message) {
        var symbol = message.params.symbol;
        var updateCandle = message.params.data.pop();
        // console.log(`${symbol} - ${updateCandle.close} - ${updateCandle.timestamp}`);
        var prevCandle = this.savedCandles[symbol][this.savedCandles[symbol].length - 1];
        var prevUpdate = +new Date(prevCandle.timestamp);
        var lastUpdate = +new Date(updateCandle.timestamp);
        if (lastUpdate - prevUpdate === 0) {
            this.savedCandles[symbol].pop();
        }
        this.savedCandles[symbol] = this.savedCandles[symbol].concat([updateCandle]);
        this.injectableObservables.candles$.next(this.savedCandles);
    };
    CandleService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root',
        }),
        __metadata("design:paramtypes", [_injectable_observables_service__WEBPACK_IMPORTED_MODULE_1__["InjectableObservablesService"],
            _crypto_exchange_module_hitbtc_api_service__WEBPACK_IMPORTED_MODULE_2__["HitBTCApi"]])
    ], CandleService);
    return CandleService;
}());



/***/ }),

/***/ "./src/app/services/indicator.service.ts":
/*!***********************************************!*\
  !*** ./src/app/services/indicator.service.ts ***!
  \***********************************************/
/*! exports provided: IndicatorService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndicatorService", function() { return IndicatorService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _injectable_observables_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./injectable-observables.service */ "./src/app/services/injectable-observables.service.ts");
/* harmony import */ var _models_ChartFormats_ScatterChartFormat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models/ChartFormats/ScatterChartFormat */ "./src/app/models/ChartFormats/ScatterChartFormat.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var IndicatorService = /** @class */ (function () {
    function IndicatorService(injectableObservables) {
        this.injectableObservables = injectableObservables;
        this.savedIndicators = {};
    }
    IndicatorService.prototype.handleIndicatorsUpdate = function (indicatorUpdateModel) {
        var _this = this;
        Object.keys(indicatorUpdateModel.values).forEach(function (plotName) {
            var symbolID = indicatorUpdateModel.symbolID;
            var indicatorValuesOfPlot = indicatorUpdateModel.values[plotName];
            if (!_this.savedIndicators[symbolID]) {
                _this.savedIndicators[symbolID] = {};
            }
            if (!_this.savedIndicators[symbolID][plotName]) {
                _this.savedIndicators[symbolID][plotName] = new _models_ChartFormats_ScatterChartFormat__WEBPACK_IMPORTED_MODULE_2__["ScatterChartFormat"]();
                _this.savedIndicators[symbolID][plotName].name = plotName;
            }
            _this.updateLastIndicator(_this.savedIndicators[symbolID][plotName], indicatorValuesOfPlot);
            _this.savedIndicators[symbolID][plotName].x.push(indicatorValuesOfPlot.timestamp);
            _this.savedIndicators[symbolID][plotName].y.push(indicatorValuesOfPlot.value);
        });
        this.notifyAboutNewIndicatorValues();
    };
    IndicatorService.prototype.getIndicatorValue = function (symbolID, period) {
        var _this = this;
        if (period === void 0) { period = 1; }
        var indicatorValuePeriodsAgo = {
            symbolID: symbolID,
            values: {},
        };
        Object.keys(this.savedIndicators[symbolID]).forEach(function (plotName) {
            indicatorValuePeriodsAgo.values[plotName] = {
                value: _this.savedIndicators[symbolID][plotName].y.slice(-period).shift(),
                timestamp: _this.savedIndicators[symbolID][plotName].x.slice(-period).shift(),
            };
        });
        return indicatorValuePeriodsAgo;
    };
    IndicatorService.prototype.updateLastIndicator = function (plotObject, updateIndicator) {
        var lastUpdate = +new Date(updateIndicator.timestamp);
        var prevUpdate = +new Date(plotObject.x[plotObject.x.length - 1]);
        if (lastUpdate - prevUpdate === 0) {
            plotObject.x.pop();
            plotObject.y.pop();
        }
    };
    IndicatorService.prototype.notifyAboutNewIndicatorValues = function () {
        this.injectableObservables.indicator$.next(this.savedIndicators);
    };
    IndicatorService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root',
        }),
        __metadata("design:paramtypes", [_injectable_observables_service__WEBPACK_IMPORTED_MODULE_1__["InjectableObservablesService"]])
    ], IndicatorService);
    return IndicatorService;
}());



/***/ }),

/***/ "./src/app/services/injectable-observables.service.ts":
/*!************************************************************!*\
  !*** ./src/app/services/injectable-observables.service.ts ***!
  \************************************************************/
/*! exports provided: InjectableObservablesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InjectableObservablesService", function() { return InjectableObservablesService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var InjectableObservablesService = /** @class */ (function () {
    function InjectableObservablesService() {
        this.config$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["ReplaySubject"]();
        this.candles$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["ReplaySubject"]();
        this.indicator$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["ReplaySubject"]();
        this.positions$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["ReplaySubject"]();
        this.balance$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["ReplaySubject"]();
        this.positionAction$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["ReplaySubject"]();
        this.strategyAction$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["ReplaySubject"]();
        this.moneyAction$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["ReplaySubject"]();
    }
    InjectableObservablesService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], InjectableObservablesService);
    return InjectableObservablesService;
}());



/***/ }),

/***/ "./src/app/services/money-manager.service.ts":
/*!***************************************************!*\
  !*** ./src/app/services/money-manager.service.ts ***!
  \***************************************************/
/*! exports provided: MoneyManagerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MoneyManagerService", function() { return MoneyManagerService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _injectable_observables_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./injectable-observables.service */ "./src/app/services/injectable-observables.service.ts");
/* harmony import */ var _models_SharedConstants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models/SharedConstants */ "./src/app/models/SharedConstants.ts");
/* harmony import */ var _crypto_exchange_module_hitbtc_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../crypto-exchange-module/hitbtc-api.service */ "./src/app/crypto-exchange-module/hitbtc-api.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MoneyManagerService = /** @class */ (function () {
    function MoneyManagerService(injectableObservables, hitBTCApiService) {
        var _this = this;
        this.injectableObservables = injectableObservables;
        this.hitBTCApiService = hitBTCApiService;
        this.balance = [];
        injectableObservables.strategyAction$.subscribe(function (actionUpdate) { return _this.handleActionUpdate(actionUpdate); });
        injectableObservables.config$.subscribe(function (configUpdate) { return _this.handleConfigUpdate(configUpdate); });
        injectableObservables.balance$.subscribe(function (balance) { return _this.handleBalanceUpdate(balance); });
    }
    MoneyManagerService.prototype.handleActionUpdate = function (actionUpdate) {
        if (actionUpdate.advisedResult !== _models_SharedConstants__WEBPACK_IMPORTED_MODULE_2__["Side"].none) {
            this.injectableObservables.moneyAction$.next(__assign({}, actionUpdate, { amount: this.countAmountAvailableToPerform(actionUpdate) }));
        }
    };
    MoneyManagerService.prototype.countAmountAvailableToPerform = function (actionUpdate) {
        var _this = this;
        if (!this.balance.length) {
            return 0;
        }
        switch (actionUpdate.advisedResult) {
            case _models_SharedConstants__WEBPACK_IMPORTED_MODULE_2__["Side"].buy:
                return +this.balance.find(function (balance) { return balance.currency === _this.config.symbolInfo[actionUpdate.symbolID].quoteCurrency; }).available;
            case _models_SharedConstants__WEBPACK_IMPORTED_MODULE_2__["Side"].sell:
                return +this.balance.find(function (balance) { return balance.currency === _this.config.symbolInfo[actionUpdate.symbolID].baseCurrency; }).available;
            default:
                return 0;
        }
    };
    MoneyManagerService.prototype.handleConfigUpdate = function (configUpdate) {
        var _this = this;
        this.config = configUpdate;
        var arrayOfRequests = configUpdate.availableSymbolsForInvesting.map(function (symbol) {
            if (configUpdate.symbolInfo[symbol.id]) {
                return;
            }
            return _this.hitBTCApiService.getSymbolDescription(symbol.id);
        }).filter(function (request) { return request; });
        rxjs__WEBPACK_IMPORTED_MODULE_4__["zip"].apply(void 0, arrayOfRequests).subscribe(function (symbolInfo) {
            var objForUpd = {};
            symbolInfo.forEach(function (symbol) {
                var parsedSymbolInfo = JSON.parse(symbol);
                objForUpd[parsedSymbolInfo.id] = parsedSymbolInfo;
            });
            _this.injectableObservables.config$.next(__assign({}, configUpdate, { symbolInfo: objForUpd }));
        });
    };
    MoneyManagerService.prototype.handleBalanceUpdate = function (balance) {
        this.balance = balance;
    };
    MoneyManagerService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root',
        }),
        __metadata("design:paramtypes", [_injectable_observables_service__WEBPACK_IMPORTED_MODULE_1__["InjectableObservablesService"],
            _crypto_exchange_module_hitbtc_api_service__WEBPACK_IMPORTED_MODULE_3__["HitBTCApi"]])
    ], MoneyManagerService);
    return MoneyManagerService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false,
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/libs/ws.service.ts":
/*!********************************!*\
  !*** ./src/libs/ws.service.ts ***!
  \********************************/
/*! exports provided: WSService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WSService", function() { return WSService; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");

var WSService = /** @class */ (function () {
    function WSService(url) {
        var _this = this;
        console.log('WebSocket is inited');
        this.ws = new WebSocket(url);
        this.ws.onclose = function (event) {
            console.log('WebSocket is closed now.');
            console.log(event);
            console.log('WebSocket is inited');
            _this.ws = new WebSocket(url);
        };
        this.ws.onerror = function (event) {
            console.error('WebSocket error observed:', event);
        };
    }
    WSService.prototype.send = function (message) {
        var _this = this;
        this.ws.onopen = function () { return _this.ws.send(JSON.stringify(message)); };
    };
    WSService.prototype.onMessage = function () {
        var _this = this;
        return new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"](function (observer) {
            _this.ws.onmessage = function (data) { return observer.next(JSON.parse(data.data)); };
        });
    };
    WSService.prototype.closeConnection = function () {
        console.log('Connection is closed');
        this.ws.close();
    };
    return WSService;
}());



/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app-module/app.module */ "./src/app/app-module/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Valera\Documents\Git\hitbtc\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map