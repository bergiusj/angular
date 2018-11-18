/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { createFeatureSelector } from '@ngrx/store';
import { FileManagerActionTypes } from './file-manager.action';
/**
 * @record
 */
export function StoreEntities() { }
/**
 * @record
 */
export function IFileManagerState() { }
if (false) {
    /** @type {?} */
    IFileManagerState.prototype.entities;
    /** @type {?} */
    IFileManagerState.prototype.files;
    /** @type {?} */
    IFileManagerState.prototype.selectedFiles;
}
/**
 * @param {?} state
 * @param {?} action
 * @return {?}
 */
function cropFile(state, action) {
    /** @type {?} */
    var file = action.payload.file;
    /** @type {?} */
    var id = file.getId().toString();
    state.entities[id] = (/** @type {?} */ (tslib_1.__assign({}, file.toJSON())));
    return {
        entities: state.entities,
        files: state.files,
        selectedFiles: state.selectedFiles
    };
}
/**
 * @param {?} state
 * @return {?}
 */
function inverseFilesSelection(state) {
    return {
        entities: state.entities,
        files: state.files,
        selectedFiles: state.files.filter(function (i) { return state.selectedFiles.indexOf(i) === -1; })
    };
}
/**
 * @param {?} state
 * @param {?} action
 * @return {?}
 */
function loadFiles(state, action) {
    /** @type {?} */
    var entities = {};
    /** @type {?} */
    var files = [];
    action.payload.files.map(function (file) {
        /** @type {?} */
        var id = file.id.toString();
        entities[id] = file;
        files.push(id);
    });
    return {
        entities: entities,
        files: files,
        selectedFiles: []
    };
}
/**
 * @param {?} state
 * @param {?} action
 * @return {?}
 */
function moveFiles(state, action) {
    /** @type {?} */
    var files = action.payload.files;
    /** @type {?} */
    var ids = files.map(function (file) { return file.id.toString(); });
    /** @type {?} */
    var folderId = action.payload.folderId ? action.payload.folderId.toString() : '';
    /** @type {?} */
    var entities = tslib_1.__assign({}, state.entities);
    ids.forEach(function (id) {
        /** @type {?} */
        var oldEntity = tslib_1.__assign({}, entities[id]);
        oldEntity.folderId = folderId;
        entities[id] = oldEntity;
    });
    return {
        entities: entities,
        files: state.files.filter(function (i) { return ids.indexOf(i) === -1; }),
        selectedFiles: state.selectedFiles.filter(function (i) { return ids.indexOf(i) === -1; })
    };
}
/**
 * @param {?} state
 * @param {?} action
 * @return {?}
 */
function removeFile(state, action) {
    /** @type {?} */
    var id = action.payload.file.getId();
    delete state.entities[id];
    return {
        entities: state.entities,
        files: state.files.filter(function (i) { return i !== id; }),
        selectedFiles: state.selectedFiles
    };
}
/**
 * @param {?} state
 * @return {?}
 */
function removeSelectedFiles(state) {
    /** @type {?} */
    var files = state.files.filter(function (i) { return state.selectedFiles.indexOf(i) === -1; });
    /** @type {?} */
    var entities = {};
    files.forEach(function (fileId) {
        entities[fileId] = state.entities[fileId];
    });
    return {
        entities: entities,
        files: files,
        selectedFiles: []
    };
}
/**
 * @param {?} state
 * @param {?} action
 * @return {?}
 */
function selectFile(state, action) {
    return {
        entities: state.entities,
        files: state.files,
        selectedFiles: tslib_1.__spread(state.selectedFiles, [action.payload.file.getId().toString()])
    };
}
/**
 * @param {?} state
 * @return {?}
 */
function selectAllFiles(state) {
    return {
        entities: state.entities,
        files: state.files,
        selectedFiles: tslib_1.__spread(state.files)
    };
}
/**
 * @param {?} state
 * @param {?} action
 * @return {?}
 */
function uploadFiles(state, action) {
    /** @type {?} */
    var newState = {
        entities: tslib_1.__assign({}, state.entities),
        files: tslib_1.__spread(state.files),
        selectedFiles: []
    };
    action.payload.files.forEach(function (file) {
        /** @type {?} */
        var id = file.id.toString();
        newState.entities[id] = file;
        newState.files.push(id);
    });
    return newState;
}
/**
 * @param {?} state
 * @return {?}
 */
function unSelectAllFiles(state) {
    return {
        entities: state.entities,
        files: state.files,
        selectedFiles: []
    };
}
/**
 * @param {?} state
 * @param {?} action
 * @return {?}
 */
function unSelectFile(state, action) {
    /** @type {?} */
    var fileId = action.payload.file.getId().toString();
    return {
        entities: state.entities,
        files: state.files,
        selectedFiles: state.selectedFiles.filter(function (id) { return id !== fileId; })
    };
}
/**
 * @param {?=} state
 * @param {?=} action
 * @return {?}
 */
export function fileManagerReducer(state, action) {
    if (state === void 0) { state = {
        entities: {},
        files: [],
        selectedFiles: []
    }; }
    switch (action.type) {
        case FileManagerActionTypes.CROP_FILE_SUCCESS:
            return cropFile(state, action);
        case FileManagerActionTypes.INVERSE_FILE_SELECTION:
            return inverseFilesSelection(state);
        case FileManagerActionTypes.DELETE_FILE_SELECTION_SUCCESS:
            return removeSelectedFiles(state);
        case FileManagerActionTypes.DELETE_FILE_SUCCESS:
            return removeFile(state, action);
        case FileManagerActionTypes.MOVE_FILES_SUCCESS:
            return moveFiles(state, action);
        case FileManagerActionTypes.LOAD_FILES_SUCCESS:
            return loadFiles(state, action);
        case FileManagerActionTypes.SELECT_ALL:
            return selectAllFiles(state);
        case FileManagerActionTypes.SELECT_FILE:
            return selectFile(state, action);
        case FileManagerActionTypes.UNSELECT_ALL:
            return unSelectAllFiles(state);
        case FileManagerActionTypes.UNSELECT_FILE:
            return unSelectFile(state, action);
        case FileManagerActionTypes.UPLOAD_FILE_SUCCESS:
            return uploadFiles(state, action);
        case FileManagerActionTypes.DELETE_FILE_SELECTION:
        case FileManagerActionTypes.CROP_FILE:
        case FileManagerActionTypes.DELETE_FILE:
        case FileManagerActionTypes.LOAD_FILES:
        case FileManagerActionTypes.MOVE_FILES_ERROR:
            return state;
        default:
            return state;
    }
}
/** @type {?} */
export var filemanagerStateSelector = createFeatureSelector('files');
/** @type {?} */
export var getAll = function (state) {
    return state.files.map(function (id) { return state.entities[id]; });
};
/** @type {?} */
export var isChangeStateFiles = function (newState, prevState) {
    return prevState.files.length !== newState.files.length || prevState.files.filter(function (i) { return newState.files.indexOf(i) === -1; }).length > 0;
};
/** @type {?} */
export var isChangeStateSelectedFiles = function (newState, prevState) {
    return prevState.selectedFiles.length !== newState.selectedFiles.length || prevState.selectedFiles.filter(function (i) { return newState.selectedFiles.indexOf(i) === -1; }).length > 0;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1tYW5hZ2VyLnJlZHVjZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Acmlnbi9hbmd1bGFyMi1maWxlbWFuYWdlci8iLCJzb3VyY2VzIjpbImxpYi9zdG9yZS9maWxlLW1hbmFnZXIucmVkdWNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBQyxxQkFBcUIsRUFBbUIsTUFBTSxhQUFhLENBQUM7QUFDcEUsT0FBTyxFQUdMLHNCQUFzQixFQUd2QixNQUFNLHVCQUF1QixDQUFDOzs7O0FBRS9CLG1DQUVDOzs7O0FBRUQsdUNBSUM7OztJQUhDLHFDQUF3Qjs7SUFDeEIsa0NBQWdCOztJQUNoQiwwQ0FBd0I7Ozs7Ozs7QUFJMUIsU0FBUyxRQUFRLENBQUMsS0FBd0IsRUFBRSxNQUE2Qjs7UUFDakUsSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSTs7UUFDMUIsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFFbEMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsR0FBRyx3Q0FBZ0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFDLENBQUM7SUFFcEQsT0FBTztRQUNMLFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUTtRQUN4QixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUs7UUFDbEIsYUFBYSxFQUFFLEtBQUssQ0FBQyxhQUFhO0tBQ25DLENBQUM7QUFDSixDQUFDOzs7OztBQUVELFNBQVMscUJBQXFCLENBQUMsS0FBd0I7SUFDckQsT0FBTztRQUNMLFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUTtRQUN4QixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUs7UUFDbEIsYUFBYSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBUyxJQUFLLE9BQUEsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQXJD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LEdBQUcsVUFBQyxLQUF3QjtJQUM3QyxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUMsRUFBVSxJQUFLLE9BQUEsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO0FBQzdELENBQUM7O0FBRUQsTUFBTSxLQUFPLGtCQUFrQixHQUFHLFVBQUMsUUFBMkIsRUFBRSxTQUE0QjtJQUMxRixPQUFPLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBUyxJQUFLLE9BQUEsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQWhDLENBQWdDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ2hKLENBQUM7O0FBRUQsTUFBTSxLQUFPLDBCQUEwQixHQUFHLFVBQUMsUUFBMkIsRUFBRSxTQUE0QjtJQUNsRyxPQUFPLFNBQVMsQ0FBQyxhQUFhLENBQUMsTUFBTSxLQUFLLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxJQUFJLFNBQVMsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBUyxJQUFLLE9BQUEsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQXhDLENBQXdDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ2hMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0lPdXRlckZpbGV9IGZyb20gJy4uL2ZpbGVzTGlzdC9pbnRlcmZhY2UvSU91dGVyRmlsZSc7XG5pbXBvcnQge2NyZWF0ZUZlYXR1cmVTZWxlY3RvciwgTWVtb2l6ZWRTZWxlY3Rvcn0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHtcbiAgQ3JvcEZpbGVTdWNjZXNzQWN0aW9uLCBEZWxldGVGaWxlU3VjY2Vzc0FjdGlvbixcbiAgRmlsZU1hbmFnZXJBY3Rpb24sXG4gIEZpbGVNYW5hZ2VyQWN0aW9uVHlwZXMsXG4gIExvYWRGaWxlc1N1Y2Nlc3NBY3Rpb24sXG4gIE1vdmVGaWxlc1N1Y2Nlc3NBY3Rpb24sIFNlbGVjdEZpbGVBY3Rpb24sIFVuU2VsZWN0RmlsZUFjdGlvbiwgVXBsb2FkRmlsZXNTdWNjZXNzQWN0aW9uXG59IGZyb20gJy4vZmlsZS1tYW5hZ2VyLmFjdGlvbic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RvcmVFbnRpdGllcyB7XG4gIFtrZXk6IHN0cmluZ106IElPdXRlckZpbGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUZpbGVNYW5hZ2VyU3RhdGUge1xuICBlbnRpdGllczogU3RvcmVFbnRpdGllcztcbiAgZmlsZXM6IHN0cmluZ1tdO1xuICBzZWxlY3RlZEZpbGVzOiBzdHJpbmdbXTtcbn1cblxuXG5mdW5jdGlvbiBjcm9wRmlsZShzdGF0ZTogSUZpbGVNYW5hZ2VyU3RhdGUsIGFjdGlvbjogQ3JvcEZpbGVTdWNjZXNzQWN0aW9uKTogSUZpbGVNYW5hZ2VyU3RhdGUge1xuICBjb25zdCBmaWxlID0gYWN0aW9uLnBheWxvYWQuZmlsZTtcbiAgY29uc3QgaWQgPSBmaWxlLmdldElkKCkudG9TdHJpbmcoKTtcblxuICBzdGF0ZS5lbnRpdGllc1tpZF0gPSA8SU91dGVyRmlsZT57Li4uZmlsZS50b0pTT04oKX07XG5cbiAgcmV0dXJuIHtcbiAgICBlbnRpdGllczogc3RhdGUuZW50aXRpZXMsXG4gICAgZmlsZXM6IHN0YXRlLmZpbGVzLFxuICAgIHNlbGVjdGVkRmlsZXM6IHN0YXRlLnNlbGVjdGVkRmlsZXNcbiAgfTtcbn1cblxuZnVuY3Rpb24gaW52ZXJzZUZpbGVzU2VsZWN0aW9uKHN0YXRlOiBJRmlsZU1hbmFnZXJTdGF0ZSk6IElGaWxlTWFuYWdlclN0YXRlIHtcbiAgcmV0dXJuIHtcbiAgICBlbnRpdGllczogc3RhdGUuZW50aXRpZXMsXG4gICAgZmlsZXM6IHN0YXRlLmZpbGVzLFxuICAgIHNlbGVjdGVkRmlsZXM6IHN0YXRlLmZpbGVzLmZpbHRlcigoaTogc3RyaW5nKSA9PiBzdGF0ZS5zZWxlY3RlZEZpbGVzLmluZGV4T2YoaSkgPT09IC0xKVxuICB9O1xufVxuXG5mdW5jdGlvbiBsb2FkRmlsZXMoc3RhdGU6IElGaWxlTWFuYWdlclN0YXRlLCBhY3Rpb246IExvYWRGaWxlc1N1Y2Nlc3NBY3Rpb24pOiBJRmlsZU1hbmFnZXJTdGF0ZSB7XG4gIGNvbnN0IGVudGl0aWVzOiBTdG9yZUVudGl0aWVzID0ge307XG4gIGNvbnN0IGZpbGVzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIGFjdGlvbi5wYXlsb2FkLmZpbGVzLm1hcCgoZmlsZTogSU91dGVyRmlsZSkgPT4ge1xuICAgIGNvbnN0IGlkID0gZmlsZS5pZC50b1N0cmluZygpO1xuXG4gICAgZW50aXRpZXNbaWRdID0gZmlsZTtcbiAgICBmaWxlcy5wdXNoKGlkKTtcbiAgfSk7XG5cblxuICByZXR1cm4ge1xuICAgIGVudGl0aWVzOiBlbnRpdGllcyxcbiAgICBmaWxlczogZmlsZXMsXG4gICAgc2VsZWN0ZWRGaWxlczogW11cbiAgfTtcbn1cblxuXG5mdW5jdGlvbiBtb3ZlRmlsZXMoc3RhdGU6IElGaWxlTWFuYWdlclN0YXRlLCBhY3Rpb246IE1vdmVGaWxlc1N1Y2Nlc3NBY3Rpb24pOiBJRmlsZU1hbmFnZXJTdGF0ZSB7XG4gIGNvbnN0IGZpbGVzID0gYWN0aW9uLnBheWxvYWQuZmlsZXM7XG4gIGNvbnN0IGlkczogc3RyaW5nW10gPSBmaWxlcy5tYXAoZmlsZSA9PiBmaWxlLmlkLnRvU3RyaW5nKCkpO1xuICBjb25zdCBmb2xkZXJJZCA9IGFjdGlvbi5wYXlsb2FkLmZvbGRlcklkID8gYWN0aW9uLnBheWxvYWQuZm9sZGVySWQudG9TdHJpbmcoKSA6ICcnO1xuXG4gIGNvbnN0IGVudGl0aWVzID0gey4uLnN0YXRlLmVudGl0aWVzfTtcblxuICBpZHMuZm9yRWFjaCgoaWQ6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IG9sZEVudGl0eSA9IHsuLi5lbnRpdGllc1tpZF19O1xuICAgIG9sZEVudGl0eS5mb2xkZXJJZCA9IGZvbGRlcklkO1xuXG4gICAgZW50aXRpZXNbaWRdID0gb2xkRW50aXR5O1xuICB9KTtcblxuICByZXR1cm4ge1xuICAgIGVudGl0aWVzOiBlbnRpdGllcyxcbiAgICBmaWxlczogc3RhdGUuZmlsZXMuZmlsdGVyKChpOiBzdHJpbmcpID0+IGlkcy5pbmRleE9mKGkpID09PSAtMSksXG4gICAgc2VsZWN0ZWRGaWxlczogc3RhdGUuc2VsZWN0ZWRGaWxlcy5maWx0ZXIoKGk6IHN0cmluZykgPT4gaWRzLmluZGV4T2YoaSkgPT09IC0xKVxuICB9O1xufVxuXG5mdW5jdGlvbiByZW1vdmVGaWxlKHN0YXRlOiBJRmlsZU1hbmFnZXJTdGF0ZSwgYWN0aW9uOiBEZWxldGVGaWxlU3VjY2Vzc0FjdGlvbik6IElGaWxlTWFuYWdlclN0YXRlIHtcbiAgY29uc3QgaWQgPSBhY3Rpb24ucGF5bG9hZC5maWxlLmdldElkKCk7XG5cbiAgZGVsZXRlIHN0YXRlLmVudGl0aWVzW2lkXTtcblxuICByZXR1cm4ge1xuICAgIGVudGl0aWVzOiBzdGF0ZS5lbnRpdGllcyxcbiAgICBmaWxlczogc3RhdGUuZmlsZXMuZmlsdGVyKChpOiBzdHJpbmcpID0+IGkgIT09IGlkKSxcbiAgICBzZWxlY3RlZEZpbGVzOiBzdGF0ZS5zZWxlY3RlZEZpbGVzXG4gIH07XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVNlbGVjdGVkRmlsZXMoc3RhdGU6IElGaWxlTWFuYWdlclN0YXRlKTogSUZpbGVNYW5hZ2VyU3RhdGUge1xuICBjb25zdCBmaWxlczogc3RyaW5nW10gPSBzdGF0ZS5maWxlcy5maWx0ZXIoKGk6IHN0cmluZykgPT4gc3RhdGUuc2VsZWN0ZWRGaWxlcy5pbmRleE9mKGkpID09PSAtMSk7XG4gIGNvbnN0IGVudGl0aWVzOiBTdG9yZUVudGl0aWVzID0ge307XG5cbiAgZmlsZXMuZm9yRWFjaCgoZmlsZUlkOiBzdHJpbmcpID0+IHtcbiAgICBlbnRpdGllc1tmaWxlSWRdID0gc3RhdGUuZW50aXRpZXNbZmlsZUlkXTtcbiAgfSk7XG5cbiAgcmV0dXJuIHtcbiAgICBlbnRpdGllczogZW50aXRpZXMsXG4gICAgZmlsZXM6IGZpbGVzLFxuICAgIHNlbGVjdGVkRmlsZXM6IFtdXG4gIH07XG59XG5cbmZ1bmN0aW9uIHNlbGVjdEZpbGUoc3RhdGU6IElGaWxlTWFuYWdlclN0YXRlLCBhY3Rpb246IFNlbGVjdEZpbGVBY3Rpb24pOiBJRmlsZU1hbmFnZXJTdGF0ZSB7XG4gIHJldHVybiB7XG4gICAgZW50aXRpZXM6IHN0YXRlLmVudGl0aWVzLFxuICAgIGZpbGVzOiBzdGF0ZS5maWxlcyxcbiAgICBzZWxlY3RlZEZpbGVzOiBbLi4uc3RhdGUuc2VsZWN0ZWRGaWxlcywgYWN0aW9uLnBheWxvYWQuZmlsZS5nZXRJZCgpLnRvU3RyaW5nKCldXG4gIH07XG59XG5cbmZ1bmN0aW9uIHNlbGVjdEFsbEZpbGVzKHN0YXRlOiBJRmlsZU1hbmFnZXJTdGF0ZSk6IElGaWxlTWFuYWdlclN0YXRlIHtcbiAgcmV0dXJuIHtcbiAgICBlbnRpdGllczogc3RhdGUuZW50aXRpZXMsXG4gICAgZmlsZXM6IHN0YXRlLmZpbGVzLFxuICAgIHNlbGVjdGVkRmlsZXM6IFsuLi5zdGF0ZS5maWxlc11cbiAgfTtcbn1cblxuZnVuY3Rpb24gdXBsb2FkRmlsZXMoc3RhdGU6IElGaWxlTWFuYWdlclN0YXRlLCBhY3Rpb246IFVwbG9hZEZpbGVzU3VjY2Vzc0FjdGlvbik6IElGaWxlTWFuYWdlclN0YXRlIHtcbiAgY29uc3QgbmV3U3RhdGUgPSB7XG4gICAgZW50aXRpZXM6IHsuLi5zdGF0ZS5lbnRpdGllc30sXG4gICAgZmlsZXM6IFsuLi5zdGF0ZS5maWxlc10sXG4gICAgc2VsZWN0ZWRGaWxlczogW11cbiAgfTtcblxuICBhY3Rpb24ucGF5bG9hZC5maWxlcy5mb3JFYWNoKChmaWxlOiBJT3V0ZXJGaWxlKSA9PiB7XG4gICAgY29uc3QgaWQgPSBmaWxlLmlkLnRvU3RyaW5nKCk7XG5cbiAgICBuZXdTdGF0ZS5lbnRpdGllc1tpZF0gPSBmaWxlO1xuICAgIG5ld1N0YXRlLmZpbGVzLnB1c2goaWQpO1xuICB9KTtcblxuXG4gIHJldHVybiBuZXdTdGF0ZTtcbn1cblxuXG5mdW5jdGlvbiB1blNlbGVjdEFsbEZpbGVzKHN0YXRlOiBJRmlsZU1hbmFnZXJTdGF0ZSk6IElGaWxlTWFuYWdlclN0YXRlIHtcbiAgcmV0dXJuIHtcbiAgICBlbnRpdGllczogc3RhdGUuZW50aXRpZXMsXG4gICAgZmlsZXM6IHN0YXRlLmZpbGVzLFxuICAgIHNlbGVjdGVkRmlsZXM6IFtdXG4gIH07XG59XG5cbmZ1bmN0aW9uIHVuU2VsZWN0RmlsZShzdGF0ZTogSUZpbGVNYW5hZ2VyU3RhdGUsIGFjdGlvbjogVW5TZWxlY3RGaWxlQWN0aW9uKTogSUZpbGVNYW5hZ2VyU3RhdGUge1xuICBjb25zdCBmaWxlSWQgPSBhY3Rpb24ucGF5bG9hZC5maWxlLmdldElkKCkudG9TdHJpbmcoKTtcblxuICByZXR1cm4ge1xuICAgIGVudGl0aWVzOiBzdGF0ZS5lbnRpdGllcyxcbiAgICBmaWxlczogc3RhdGUuZmlsZXMsXG4gICAgc2VsZWN0ZWRGaWxlczogc3RhdGUuc2VsZWN0ZWRGaWxlcy5maWx0ZXIoKGlkOiBzdHJpbmcpID0+IGlkICE9PSBmaWxlSWQpXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWxlTWFuYWdlclJlZHVjZXIoc3RhdGU6IElGaWxlTWFuYWdlclN0YXRlID0ge1xuICBlbnRpdGllczoge30sXG4gIGZpbGVzOiBbXSxcbiAgc2VsZWN0ZWRGaWxlczogW11cbn0sIGFjdGlvbjogRmlsZU1hbmFnZXJBY3Rpb24pOiBJRmlsZU1hbmFnZXJTdGF0ZSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIEZpbGVNYW5hZ2VyQWN0aW9uVHlwZXMuQ1JPUF9GSUxFX1NVQ0NFU1M6XG4gICAgICByZXR1cm4gY3JvcEZpbGUoc3RhdGUsIGFjdGlvbik7XG4gICAgY2FzZSBGaWxlTWFuYWdlckFjdGlvblR5cGVzLklOVkVSU0VfRklMRV9TRUxFQ1RJT046XG4gICAgICByZXR1cm4gaW52ZXJzZUZpbGVzU2VsZWN0aW9uKHN0YXRlKTtcbiAgICBjYXNlIEZpbGVNYW5hZ2VyQWN0aW9uVHlwZXMuREVMRVRFX0ZJTEVfU0VMRUNUSU9OX1NVQ0NFU1M6XG4gICAgICByZXR1cm4gcmVtb3ZlU2VsZWN0ZWRGaWxlcyhzdGF0ZSk7XG4gICAgY2FzZSBGaWxlTWFuYWdlckFjdGlvblR5cGVzLkRFTEVURV9GSUxFX1NVQ0NFU1M6XG4gICAgICByZXR1cm4gcmVtb3ZlRmlsZShzdGF0ZSwgYWN0aW9uKTtcbiAgICBjYXNlIEZpbGVNYW5hZ2VyQWN0aW9uVHlwZXMuTU9WRV9GSUxFU19TVUNDRVNTOlxuICAgICAgcmV0dXJuIG1vdmVGaWxlcyhzdGF0ZSwgYWN0aW9uKTtcbiAgICBjYXNlIEZpbGVNYW5hZ2VyQWN0aW9uVHlwZXMuTE9BRF9GSUxFU19TVUNDRVNTOlxuICAgICAgcmV0dXJuIGxvYWRGaWxlcyhzdGF0ZSwgYWN0aW9uKTtcbiAgICBjYXNlIEZpbGVNYW5hZ2VyQWN0aW9uVHlwZXMuU0VMRUNUX0FMTDpcbiAgICAgIHJldHVybiBzZWxlY3RBbGxGaWxlcyhzdGF0ZSk7XG4gICAgY2FzZSBGaWxlTWFuYWdlckFjdGlvblR5cGVzLlNFTEVDVF9GSUxFOlxuICAgICAgcmV0dXJuIHNlbGVjdEZpbGUoc3RhdGUsIGFjdGlvbik7XG4gICAgY2FzZSBGaWxlTWFuYWdlckFjdGlvblR5cGVzLlVOU0VMRUNUX0FMTDpcbiAgICAgIHJldHVybiB1blNlbGVjdEFsbEZpbGVzKHN0YXRlKTtcbiAgICBjYXNlIEZpbGVNYW5hZ2VyQWN0aW9uVHlwZXMuVU5TRUxFQ1RfRklMRTpcbiAgICAgIHJldHVybiB1blNlbGVjdEZpbGUoc3RhdGUsIGFjdGlvbik7XG4gICAgY2FzZSBGaWxlTWFuYWdlckFjdGlvblR5cGVzLlVQTE9BRF9GSUxFX1NVQ0NFU1M6XG4gICAgICByZXR1cm4gdXBsb2FkRmlsZXMoc3RhdGUsIGFjdGlvbik7XG4gICAgY2FzZSBGaWxlTWFuYWdlckFjdGlvblR5cGVzLkRFTEVURV9GSUxFX1NFTEVDVElPTjpcbiAgICBjYXNlIEZpbGVNYW5hZ2VyQWN0aW9uVHlwZXMuQ1JPUF9GSUxFOlxuICAgIGNhc2UgRmlsZU1hbmFnZXJBY3Rpb25UeXBlcy5ERUxFVEVfRklMRTpcbiAgICBjYXNlIEZpbGVNYW5hZ2VyQWN0aW9uVHlwZXMuTE9BRF9GSUxFUzpcbiAgICBjYXNlIEZpbGVNYW5hZ2VyQWN0aW9uVHlwZXMuTU9WRV9GSUxFU19FUlJPUjpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBmaWxlbWFuYWdlclN0YXRlU2VsZWN0b3I6IE1lbW9pemVkU2VsZWN0b3I8b2JqZWN0LCBJRmlsZU1hbmFnZXJTdGF0ZT4gPSBjcmVhdGVGZWF0dXJlU2VsZWN0b3I8SUZpbGVNYW5hZ2VyU3RhdGU+KCdmaWxlcycpO1xuXG5leHBvcnQgY29uc3QgZ2V0QWxsID0gKHN0YXRlOiBJRmlsZU1hbmFnZXJTdGF0ZSk6IElPdXRlckZpbGVbXSA9PiB7XG4gIHJldHVybiBzdGF0ZS5maWxlcy5tYXAoKGlkOiBzdHJpbmcpID0+IHN0YXRlLmVudGl0aWVzW2lkXSk7XG59O1xuXG5leHBvcnQgY29uc3QgaXNDaGFuZ2VTdGF0ZUZpbGVzID0gKG5ld1N0YXRlOiBJRmlsZU1hbmFnZXJTdGF0ZSwgcHJldlN0YXRlOiBJRmlsZU1hbmFnZXJTdGF0ZSk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gcHJldlN0YXRlLmZpbGVzLmxlbmd0aCAhPT0gbmV3U3RhdGUuZmlsZXMubGVuZ3RoIHx8IHByZXZTdGF0ZS5maWxlcy5maWx0ZXIoKGk6IHN0cmluZykgPT4gbmV3U3RhdGUuZmlsZXMuaW5kZXhPZihpKSA9PT0gLTEpLmxlbmd0aCA+IDA7XG59O1xuXG5leHBvcnQgY29uc3QgaXNDaGFuZ2VTdGF0ZVNlbGVjdGVkRmlsZXMgPSAobmV3U3RhdGU6IElGaWxlTWFuYWdlclN0YXRlLCBwcmV2U3RhdGU6IElGaWxlTWFuYWdlclN0YXRlKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiBwcmV2U3RhdGUuc2VsZWN0ZWRGaWxlcy5sZW5ndGggIT09IG5ld1N0YXRlLnNlbGVjdGVkRmlsZXMubGVuZ3RoIHx8IHByZXZTdGF0ZS5zZWxlY3RlZEZpbGVzLmZpbHRlcigoaTogc3RyaW5nKSA9PiBuZXdTdGF0ZS5zZWxlY3RlZEZpbGVzLmluZGV4T2YoaSkgPT09IC0xKS5sZW5ndGggPiAwO1xufTtcbiJdfQ==