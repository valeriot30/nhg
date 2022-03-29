import ItemLogic from "../../../../../core/room/object/items/logic/ItemLogic";
import { FurniSprite } from "../../../../ui/imagers/items/FurniSprite";
import Item from "../Item";

export default class ItemLogicMultiState extends ItemLogic {

    private clicked: boolean = false;
    private _double: any;
    private animation: number = 0;

    constructor(item: Item) {
        super(item);

        this.registerEvents();

    }

    public registerEvents() {
        this.item.base.addListener("click", () => {
            //this.changeState()
        })
    }

    public changeState() {

        let animation = this.animation;

        if (this.animation > this.item.base.furniBase.getAnimations().length) {
            animation = 0;
        }
        else {
            animation++
        }

        this.item.base.setAnimation(animation)

        this.animation = animation;
    }

    public tick(delta: number) {

        this.frameTracker += delta;

        if (this.item.base.furniBase.visualizationType === "furniture_animated") {

            if (this.frameTracker > (1000 * (100 / FurniSprite.FPS)) / FurniSprite.FPS) {
                this.frameTracker = 0
                this.item.visualization?.render();
            }
        }
    }

}