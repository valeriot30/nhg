<template>
    <div id="userPanel" :class="{hidden: !false}" v-bind:style="{ top: userTop + 'px', left: userLeft + 'px' }">
        <ul>
            <li @click="dance()">Balla</li>
        </ul>
    </div>
</template>

<script lang="js">
    import Engine from '../../../game/Engine';
    import { ActionId } from '../../../game/engine/ui/imagers/avatars/Avatar';

    export default {
        name: "UserPanelGUI",
        props: ["visible"],
        data() {
            return {
                userTop: 0,
                userLeft: 0,
                userName: ""
            }
        },
        methods: {
            dance() {
                let user = Engine.getInstance().RoomsManager?.CurrentRoom?.RoomUsersManager.getUser(this.userName);

                if(!user) {
                    return;
                }

                let userVisualization = user.Visualization;

                if(!userVisualization.IsDancing) {
                    userVisualization.Action = ActionId.DANCE;
                    userVisualization.NeedsUpdate = true;
                    userVisualization.draw();
                } else {
                    userVisualization.Action = ActionId.DEFAULT;
                    userVisualization.NeedsUpdate = false;
                    userVisualization.draw();
                }

                this.$props.visible = false;
            }
        },
        mounted() {
            
        }
    }
</script>