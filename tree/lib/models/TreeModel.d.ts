import { IOuterNode } from '../interfaces/IOuterNode';
import { IConfiguration } from '../interfaces/IConfiguration';
import { ITreeData, ITreeNodes, ITreeState } from '../store/ITreeState';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
export declare class TreeModel {
    protected store: Store<ITreeState>;
    protected treeData$: Observable<ITreeData>;
    configuration: IConfiguration;
    protected _fullyLoaded: boolean;
    readonly treeId: string;
    readonly isFullyLoaded: boolean;
    nodes$: Observable<ITreeNodes>;
    rootNodes$: Observable<IOuterNode[]>;
    currentSelectedNode$: Observable<IOuterNode>;
    private expanded;
    private selected;
    private previouslySelected;
    private subscription;
    constructor(store: Store<ITreeState>, treeData$: Observable<ITreeData>, configuration: IConfiguration, _fullyLoaded?: boolean);
    destroy(): void;
    getParentsList(): Observable<IOuterNode[]>;
    getChildren(nodeId: string | null): Observable<IOuterNode[]>;
    initPath(path: string[]): void;
    isExpanded(node: IOuterNode): boolean;
    isSelected(node: IOuterNode): boolean;
    wasPreviouslySelected(nodeId: string): boolean;
    private initConfiguration;
    private getNodesByParentId;
    private sortNodes;
    private subscribeExpanded;
    private subscribeSelected;
    private subscribePreviouslySelected;
}