<template>
    <div id="previewBox" ref="previewBox" :class="{hidden: !visible}" draggable="false">
        <div v-if="mode == 'user'" class="previewBoxContainer userPreview">
            <div class="previewBoxContainerInfo">
                <div class="titleBar">
                    <span class="title">
                       {{ this.username }}
                    </span>
                    <span class="closeIcon" @click="engine.gameGui.previewBoxGui.hide()">-</span>
                </div>
                <div class="userInfoContainer">
                    <div class="imageContainer">
                        <img ref="playerImage" :src="this.image"/>
                    </div>
                    <div class="badgeContainer">

                    </div>
                </div>
                <div class="additionalInfoContainer">
                    <p>{{ this.motto ? this.motto : "sdasd" }}</p>
                    
                </div>
            </div>
             <div class="previewBoxContainerButtons" :class="{hidden: optionsVisible}">
                <div class="previewButton" ref="moveItemButton" id="moveItemButton"
                   @click.stop="moveItem()">
                    Aggiungi</div>

                <div class="previewButton" ref="rotateItemButton" id="rotateItemButton" @click.stop="rotateItem">
                    Sussurra</div>
            </div>
        </div>
        

        <div v-if="mode == 'item'" class="previewBoxContainer itemPreivew">
            <div class="previewBoxContainerInfo">
                <div class="titleBar">
                    <span class="title">
                        {{ item ? item.getId() : "Item" }}
                    </span>
                    <span class="closeIcon" @click="hide()">&times;</span>
                </div>
                <hr>
                <div class="itemImageContainer" ref="itemImageContainer">
                    <img ref="itemImage" :src="this.image"/>
                </div>
                <div class="additionalInfoContainer" ref="additionalInfoContainer">
                </div>
            </div>
            <div class="previewBoxContainerButtons">
                <div class="previewButton" ref="moveItemButton" id="moveItemButton"
                    :class="{hidden: false}" @click.stop="moveItem()">
                    Sposta</div>

                <div class="previewButton" ref="rotateItemButton" id="rotateItemButton"
                    :class="{hidden: false}" @click.stop="rotateItem">
                    Ruota</div>

                <div class="previewButton" ref="pickItemButton" id="pickItemButton"
                    :class="{hidden: false}" @click.stop="pickItemMethod">
                    Prendi</div>

                <div class="previewButton" ref="useItemButton" id="useItemButton"
                    :class="{hidden: false}" @click.stop="useItemMethod" v-if="item ? this.item.Base.furniBase.visualizationType === 'furniture_animated': true">
                    Usa</div>
            </div>
        </div>
    </div>
</template>
<script>
import Engine from '../../../game/Engine';
import FloorItem from '../../../game/engine/room/objects/items/FloorItem';
import WallItem from '../../../game/engine/room/objects/items/WallItem';
import FurniImager from '../../../game/engine/ui/imagers/items/FurniImager';
export default {
    name: "PreviewBoxGui",
    props: ["visible"],
    data() {
        return {
            mode: 'item',
            item: null, // Item 
            movingItem: null,
            isMoving: false,
            motto: "",
            username: "",
            image: "",
            optionsVisible: false
        }
    },
    mounted() {
        
    },
    methods :  {
        
        hide() {
            this.$props.visible = false;
        },

        useItemMethod() {
            
        },

        rotateItem() {
            this.item.Base.rotate();
        },

        moveItem() {
            let defaultItem = this.item;
            this.movingItem = this.item;
            
            this.movingItem.getBase().alpha = FurniImager.LOADING_ALPHA;
                this.isMoving = true;
                Engine.getInstance().getDisplay().app.stage.addListener("mousemove", (e) => {

                        this.movingItem.getBase().cacheAsBitMap = true;
                        let pos = e.data.global;
                    
                    if(this.isMoving) {

                        this.movingItem.getBase().x  = pos.x - (Engine.getInstance().getDisplay().app.view.width / 2);
                        this.movingItem.getBase().y  = pos.y - (Engine.getInstance().getDisplay().app.view.height / 2);

                        if(!this.movingItem.getBase().hasIcon) {
                            if(this.movingItem instanceof FloorItem) {
                                Engine.getInstance().getRoomManager().currentRoom.getRoomLayout().Visualization.getCanvasWall().addListener("mouseover", () => {
                                    this.movingItem.getBase().turnIntoIcon();
                                })

                                Engine.getInstance().getRoomManager().currentRoom.getRoomViewer().root.addListener("pointerout", () => {
                                    this.movingItem.getBase().turnIntoIcon();
                                })

                                Engine.getInstance().getRoomManager().currentRoom.getRoomLayout().Visualization.getCanvasFloor().addListener("pointerover", () => {
                                    this.movingItem.getBase().restore(defaultItem.getBase().animation);
                                    this.item.getBase().alpha = FurniImager.LOADING_ALPHA;
                                })
                            }
                            else if(this.movingItem instanceof WallItem) {
                                Engine.getInstance().getRoomManager().currentRoom.getRoomLayout().Visualization.getCanvasFloor().addListener("mouseover", () => {
                                    this.movingItem.getBase().turnIntoIcon();
                                })

                                Engine.getInstance().getRoomManager().currentRoom.getRoomViewer().root.addListener("pointerout", () => {
                                    this.movingItem.getBase().turnIntoIcon();
                                })
                                 Engine.getInstance().getRoomManager().currentRoom.getRoomLayout().Visualization.getCanvasWall().addListener("pointerover", () => {
                                    this.movingItem.getBase().restore(0);
                                    this.item.getBase().alpha = FurniImager.LOADING_ALPHA;
                                })
                            }
                        }

                    
                        
                        Engine.getInstance().getRoomManager().currentRoom.getRoomViewer().root.addListener("pointertap", () => {
                            this.movingItem.getBase().x = pos.x - (Engine.getInstance().getDisplay().app.view.width / 2);
                            this.movingItem.getBase().y  = pos.y - (Engine.getInstance().getDisplay().app.view.height / 2);
                            this.movingItem.getBase().alpha = 1;
                            this.isMoving = false;
                            Engine.getInstance().getDisplay().app.stage.removeListener("mousemove");
                            Engine.getInstance().getRoomManager().currentRoom.getRoomViewer().root.removeListener("pointertap");
                            Engine.getInstance().getRoomManager().currentRoom.getRoomLayout().Visualization.getCanvasWall().removeListener("mouseover");
                            Engine.getInstance().getRoomManager().currentRoom.getRoomViewer().root.removeListener("pointerout");
                            Engine.getInstance().getRoomManager().currentRoom.getRoomLayout().Visualization.getCanvasFloor().removeListener("pointerover");
                        })
                    }

                    //console.log('in spostamento..');
                    
                })
        }

    }
}
</script>