"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let task = class task {
    constructor() {
        this.Name = "";
        this.CreateTime = new Date(Date.now());
        this.UpdateTime = new Date(Date.now());
    }
};
task.EntityName = "Task";
__decorate([
    typeorm_1.PrimaryGeneratedColumn("int"),
    __metadata("design:type", Number)
], task.prototype, "ID", void 0);
__decorate([
    typeorm_1.Column("nvarchar"),
    __metadata("design:type", String)
], task.prototype, "Name", void 0);
__decorate([
    typeorm_1.Column("int"),
    __metadata("design:type", Number)
], task.prototype, "Activity", void 0);
__decorate([
    typeorm_1.Column("datetime"),
    __metadata("design:type", Date)
], task.prototype, "CreateTime", void 0);
__decorate([
    typeorm_1.Column("datetime"),
    __metadata("design:type", Date)
], task.prototype, "UpdateTime", void 0);
task = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [])
], task);
exports.task = task;
