import Vue from 'vue'

import UIComponentManager from "../UIComponentManager";
import CatalogueGUI from "../../../../../components/gui/catalogue/CatalogueGUI.vue"
import IComponentShowableUI from '../../../../core/ui/IComponentShowableUI';
import { ICatalogPage } from './ICatalogPage';

export default class CatalogueUI implements IComponentShowableUI {

    private componentManager: UIComponentManager

    public visible: boolean = false
    private gui: Vue

    private selectedItem: any | null = null
    private currentCataloguePage: ICatalogPage | null = null

    private itemPreviewRoomTiles: any | null = []
    private itemPreviewCanvas: any | null = null

    private itemPreviewOffsetX: any | null = 0
    private itemPreviewOffsetY: any | null = 0

    private catalogPreviewItem = null


    constructor(componentManager: UIComponentManager) {
        this.componentManager = componentManager

        this.gui = new (Vue.extend(CatalogueGUI))({
            propsData: {
                visible: this.visible
            }
        });

        // this.cataloguePageRef = this.gui.$refs.cataloguePage
    }

    public getCanvasContainer() {
        return document.getElementById("roomCanvasContainer")
    }

    public init(): void {
        this.gui.$mount();
        this.componentManager.getRootComponent().appendChild(this.gui.$el)
    }

    public show(): void {
        this.visible = true;
        this.gui.$props.visible = this.visible;
    }

    public hide(): void {
        this.visible = false;
        this.gui.$props.visible = this.visible;
    }

    public toggle(): void {
        this.visible = !this.visible;
        this.gui.$props.visible = this.visible;
    }
    public force() {
        this.gui.$forceUpdate;
    }

    public setCatalogMenu(pages: any) {
        this.gui.$data.catalogMenu = pages
    }

    public loadCatalogPage(pageId: number, pageInfo: any, items: [], countItems: number, rawInfo: any) {

        let catalogPageRef: any = this.gui.$refs.cataloguePage;

        if (this.currentCataloguePage) {

            this.currentCataloguePage.pageId = pageId
            this.currentCataloguePage.pageInfo = pageInfo
            this.currentCataloguePage.items = items
            this.currentCataloguePage.catalogItems = []
            this.currentCataloguePage.countItems = countItems
            this.currentCataloguePage.rawInfo = rawInfo

            catalogPageRef.innerHTML = "";

            this.gui.$forceUpdate();

            switch (pageInfo.layout) {

                case "frontpage":
                    catalogPageRef.innerHTML = `
                        ${pageInfo.textOne}
                        ${pageInfo.textTwo}
                        `
                    break;

                case "default_grid": {
                    let tmpHtml = `
                        ${this.getItemsPreviewElement()}
                        <div class="defaultGridLayoutItemContainer ${countItems == 0 ? "hidden" : ""}">
                    `

                    // for (let i = 0; i < countItems; i++) {

                    //     let catalogItem = this.loadItem(items[i])

                    //     this.currentCataloguePage.catalogItems.push(catalogItem)

                    //     catalogItem.loadBase().then((item) => {
                    //         let iElement = document.getElementById(`catalogItem${item.id}_iconimage`)

                    //         if (iElement) {
                    //             iElement.src = item.getIcon()
                    //         }
                    //     })

                    //     tmpHtml += `
                    //     <div class="itemCell catalogItemCell" id="catalogItem${items[i].id}" data-credits="${items[i].credits}" data-itemid="${items[i].id}" data-publicname="${items[i].itemBase.publicName}">
                    //         <span class="itemIcon"><img id="catalogItem${items[i].id}_iconimage" src='${catalogItem.getIcon()}'></span>  
                    //         <span class="price">${items[i].credits} <img src='${creditIcon}' /></span>
                    //         </div>
                    // `
                    // }


                    break
                }



            }

        }



    }

    getItemsPreviewElement() {
        //<img src="${this.engine.config.general.catalogueResourcesUrl + "tribu.png"}" />
        return `
            <div class="itemPreviewContainer">
                <div class="placeHolderImage" id="placeHolderImage">
                </div>
                <div class="roomPreviewContainer hidden" id="roomPreviewContainer">
                    <span id="itemName"></span>
                    <div id="previewCamera">
                        <div id="previewCanvasContainer">
                        </div>
                    </div>
                </div>
            </div>
        `
    }



}