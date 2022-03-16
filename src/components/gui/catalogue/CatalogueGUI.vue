<template>
    <div id="catalogue" ref="catalogue" :class="{hidden: !visible}" v-draggable="dragBox" draggable="true">
        <div class="title-bar" ref="handler">
            <div class="title">Catalogo</div>
            <div class="closeIcon" @click="close()"></div>
        </div>
        <div class="header">
            <div class="headerImage">
                <img v-if="activePage  && activePage.rawInfo && activePage.rawInfo.headerImage && activePage.rawInfo.headerImage != ''"
                    :src="resourceUrl + activePage.rawInfo.headerImage" />
            </div>
            <div class="iconContainer">
                <img v-if="currentMenu && currentMenu.iconImage"
                    :src="resourceUrl + 'icon_' + currentMenu.iconImage + '.png'" />
            </div>
            <div class="menuTitleWrapper">
                <span class="menuTitle">
                    {{ currentMenu.title }}
                </span>
                <span class="menuDescription">
                    {{ currentMenu.description }}
                </span>
            </div>
        </div>
        <div class="wrapper">
            <div class="catalogueMenu">
                <ul class="menuUlCatalog">
                    <TreeMenu :catalogMenu="this.catalogMenu" :currentMenu="this.currentMenu" :openPage="openPage"/>
                </ul>
            </div>
            <div class="cataloguePageContainer">
                <div class="cataloguePage" ref="cataloguePage">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        Draggable
    } from 'draggable-vue-directive'
    import UIComponent from '../../../game/engine/ui/components/UIComponentEnum';
    import TreeMenu from "./TreeMenu.vue";
    import { OutgoingPacket } from '../../../game/networking/packets/outgoing/OutgoingPacketEnum';
    import Engine from '../../../game/Engine';

    export default {
        name: "CatalogueGui",
        components: {
            TreeMenu
        },
        props: [
            'engine',
            'visible'
        ],
        directives: {
            Draggable,
        },
        data() {
            return {
                dragBox: {
                    //handle: undefined,
                    onDragStart: () => {
                        Engine.getInstance().getUserInterfaceManager().getUIComponentManager().getComponent(UIComponent.CatalogueUI).show();
                    }
                },
                catalogMenu: [],
                activePage: {},
                currentMenu: {
                    id: -1,
                    title: "",
                    description: ""
                },
                resourceUrl: Engine.getInstance().getConfig().catalogueResourcesUrl
            }
        },
        methods: {
            openPage(id, menu) {
                this.currentMenu = menu

                const message = {
                    pageId: id
                }

                Engine.getInstance().getNetworkingManager().getPacketManager().applyOut(OutgoingPacket.RequestCatalogPageEvent, message);

                //this.engine.gameGui.catalogueGui.cataloguePageRef.innerHTML = id
            },
            openPacket() {
                const message = {}

                Engine.getInstance().getNetworkingManager().getPacketManager().applyOut(OutgoingPacket.CatalogPagesListEvent, message);
            },
            // setMockOfflineData() {
            //     this.catalogMenu.push({
            //         id: 1,
            //         iconColor: "#000",
            //         isEnabled: 1,
            //         title: "Front",
            //         isVisible: true,
            //         openSubMenu: false,
            //         subPages: [{
            //             id: 2,
            //             iconColor: "#ff001b",
            //             isEnabled: 1,
            //             title: "asdas",
            //             isVisible: true,
            //             openSubMenu: false,
            //             subPages: [{
            //                 id: 3,
            //                 iconColor: "#1f7f32",
            //                 isEnabled: 1,
            //                 title: "12321",
            //                 isVisible: true,
            //                 openSubMenu: false,
            //                 subPages: [

            //                 ]
            //             }]
            //         }]
            //     }, {
            //         id: 4,
            //         iconColor: "#000",
            //         isEnabled: 1,
            //         title: "prov",
            //         isVisible: true,
            //         openSubMenu: false,
            //         subPages: []
            //     })
            // }
            close() {
                Engine.getInstance().getUserInterfaceManager().getUIComponentManager().getComponent(UIComponent.CatalogueUI).hide();
            },
        },
        // parseTreeFixData(tree) {
        //     tree.forEach(element => {
        //         element.openSubMenu = false
                
        //         if (element.subPages != null)
        //         {
        //             parseTreeFixData(element.subPages)
        //         }
        //     });
        // },
        mounted() {
            this.dragBox.handle = this.$refs.handler;

            //this.openPacket();

            // if (this.engine.config.general.debug && this.engine.config.general.offlineMode) {
            //     this.setMockOfflineData()
            // }
        }
    }
</script>

