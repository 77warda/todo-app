/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const app_controller_1 = __webpack_require__(5);
const app_service_1 = __webpack_require__(6);
const todos_module_1 = __webpack_require__(7);
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [todos_module_1.TodosModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const app_service_1 = __webpack_require__(6);
let AppController = exports.AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getData() {
        return this.appService.getData();
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "getData", null);
exports.AppController = AppController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
let AppService = exports.AppService = class AppService {
    getData() {
        return { message: 'Hello API' };
    }
};
exports.AppService = AppService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AppService);


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TodosModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const todos_service_1 = __webpack_require__(8);
const todos_controller_1 = __webpack_require__(9);
let TodosModule = exports.TodosModule = class TodosModule {
};
exports.TodosModule = TodosModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [todos_controller_1.TodosController],
        providers: [todos_service_1.TodosService],
    })
], TodosModule);


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TodosService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
let TodosService = exports.TodosService = class TodosService {
    constructor() {
        this.todos = [
            {
                id: 1,
                name: 'first',
                complete: false,
            },
            {
                id: 2,
                name: 'Second',
                complete: false,
            },
            {
                id: 3,
                name: 'third',
                complete: false,
            },
        ];
    }
    create(createTodoDto) {
        const newTodo = {
            id: this.todos.length + 1,
            complete: false,
            ...createTodoDto,
        };
        this.todos.push(newTodo);
        return newTodo;
    }
    findAll() {
        return this.todos;
    }
    findOne(id) {
        return this.todos.find((todo) => todo.id === id);
    }
    update(id, updateTodoDto) {
        const todoToUpdate = this.todos.find((todo) => todo.id === id);
        todoToUpdate.complete = !todoToUpdate.complete;
        return todoToUpdate;
    }
    remove(id) {
        const index = this.todos.findIndex((todo) => todo.id === id);
        if (index !== -1) {
            this.todos.splice(index, 1);
        }
    }
};
exports.TodosService = TodosService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], TodosService);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TodosController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const todos_service_1 = __webpack_require__(8);
const create_todo_dto_1 = __webpack_require__(10);
const update_todo_dto_1 = __webpack_require__(11);
let TodosController = exports.TodosController = class TodosController {
    constructor(todosService) {
        this.todosService = todosService;
    }
    create(createTodoDto) {
        return this.todosService.create(createTodoDto);
    }
    findAll() {
        return this.todosService.findAll();
    }
    findOne(id) {
        return this.todosService.findOne(+id);
    }
    update(id, updateTodoDto) {
        return this.todosService.update(+id, updateTodoDto);
    }
    remove(id) {
        return this.todosService.remove(+id);
    }
};
tslib_1.__decorate([
    (0, common_1.Post)(''),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof create_todo_dto_1.CreateTodoDto !== "undefined" && create_todo_dto_1.CreateTodoDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], TodosController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Get)(''),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], TodosController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], TodosController.prototype, "findOne", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_c = typeof update_todo_dto_1.UpdateTodoDto !== "undefined" && update_todo_dto_1.UpdateTodoDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], TodosController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], TodosController.prototype, "remove", null);
exports.TodosController = TodosController = tslib_1.__decorate([
    (0, common_1.Controller)('todos'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof todos_service_1.TodosService !== "undefined" && todos_service_1.TodosService) === "function" ? _a : Object])
], TodosController);


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateTodoDto = void 0;
class CreateTodoDto {
}
exports.CreateTodoDto = CreateTodoDto;


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateTodoDto = void 0;
const mapped_types_1 = __webpack_require__(12);
const create_todo_dto_1 = __webpack_require__(10);
class UpdateTodoDto extends (0, mapped_types_1.PartialType)(create_todo_dto_1.CreateTodoDto) {
}
exports.UpdateTodoDto = UpdateTodoDto;


/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("@nestjs/mapped-types");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
const app_module_1 = __webpack_require__(3);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map