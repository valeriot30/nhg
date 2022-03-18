<template>
    <div id="friends" ref="friends" :class="{hidden: visible}" v-draggable="dragBox" draggable="false">
        <div class="titleBar" ref="handler">
            <div class="titleBarBg">
                <div class="title" v-if="!chatMode">Amici</div>
                <div class="title" v-if="chatMode">aaaaa</div>
            </div>
            <div class="closeIcon" @click="closeGui()"></div>
        </div>
        <div class="friendsContainer" v-if="chatMode == false">
            <div class="friendsContainerBg">
                <div v-if="currentTab == 'requests'" class="requestTab tab">
                    <div class="searchBar">
                        <input type="text"  ref="messengerSearchInput" placeholder="Cerca amico..." class="messengerSearchInput" v-model="searchValue">
                    </div>
                    <div class="containerBar">
                        <div class="friendBox" v-for="friendRequest in friendRequests" :key="friendRequest.id" :data-friendRequestId="friendRequest.id" :data-friendRequestUsername="friendRequest.username" :class="{hidden: !friendRequest.visible}">
                            <div class="friendPic">
                                <div class="friendUserImageBg">{{ friendRequest.username[0] }}</div>
                            </div>
                            <div class="friendInfo">
                                <span class="infoUsername">{{ friendRequest.username }}</span>
                                <div class="buttons"><!--<IosAddCircleIcon class="acceptFriendRequest" title=" "  w="25px" h="25px" @click.native.stop="acceptRequest(friendRequest.id)"/><IosCloseCircleIcon class="declineFriendRequest" w="25px" h="25px" title=" "  @click.native.stop="declineRequest(friendRequest.id)"/>!--></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="currentTab == 'friends'" class="friendsTab tab">
                    <div class="searchBar">
                        <input type="text"  ref="messengerSearchInput" placeholder="Cerca..." class="messengerSearchInput" v-model="searchValue">
                    </div>
                    <div class="containerBar">
                        <div class="friendBox chatFriend" v-for="friend in friendsList" :key="friend.id" :data-friendId="friend.id" :data-friendusername="friend.username" :class="{hidden: !friend.visible}" @click.stop="chatFriend(friend)">
                            <div class="friendPic">
                                <div class="friendUserImageBg">{{ friend.username[0] }}</div>
                            </div>
                            <div class="friendInfo">
                                <span class="infoUsername">{{ friend.username }}</span>
                                <span class="infoHour"><div class="notificationChatNumberContainer"><span class="messageIconNotification" :class="{hidden: friend.notifications <= 0}">{{ friend.notifications }}</span></div></span>
                                <span class="infoFollow" :style="{display: friend.online ? 'block' : 'none'}"><IosArrowRoundForwardIcon class="followFriend" w="25px" h="25px" title=" " @click.native.stop="followFriend(friend.id)"/></span>
                                <span class="infoOnline"><div class="status" :class="{online: friend.online, offline: !friend.online}"></div></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="currentTab == 'search'" class="searchTab tab">
                    <div class="searchBar">
                        <input type="text" ref="messengerSearchInput" placeholder="Cerca..." class="messengerSearchInput" v-model="searchValue">
                        <button class="messengerSearchButton" ref="messengerSearchButton" type="button" @click="searchButtonMethod">{{ engine.gameGui.language.friends.searchButton }}</button>
                    </div>
                    <div class="containerBar">
                        <div v-if="!friendSearchFound">
                            {{ engine.gameGui.language.friends.noUsersFound }}
                        </div>
                        <div v-if="friendSearchFound">
                            <div v-for="friend in friendsBox" :key="friend.id" class="friendBox" :data-searchFriendId="friend.id">
                                    <div class="friendPic">
                                        <div class="friendUserImageBg">{{ friend.username[0] }}</div>
                                    </div>
                                    <div class="friendInfo">
                                        <span class="infoUsername">{{ friend.username }}</span>
                                        <div class="buttons" :class="{hidden: !friend.enableRequest}"><IosAddCircleIcon class="acceptFriendRequest" title=" " w="25px" h="25px" @click.native.stop="sendRequest(friend.id, friend)"/></div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="friendsBottomBar">
                <div class="friendsBottomBarItem bottomBarItem" :class="{ active: currentTab == 'requests' }" id="requestsIconButton" ref="requestsIconButton" @click="changeTab('requests')">
                    <!--<IosPersonAddIcon class="bottomIcons" title=" " w="30px" h="30px" />!-->
                </div>
                <div class="friendsBottomBarItem bottomBarItem" :class="{ active: currentTab == 'friends' }" id="friendsIconButton" ref="friendsIconButton" @click="changeTab('friends')">
                    <!--<IosContactsIcon class="bottomIcons" title=" " w="30px" h="30px" />!-->
                </div>
                <div class="friendsBottomBarItem bottomBarItem" :class="{ active: currentTab == 'search' }" id="searchIconButton" ref="searchIconButton" @click="changeTab('search')">
                    <!--<IosSearchIcon class="bottomIcons" title=" " w="30px" h="30px" />!-->
                </div>
            </div>
        </div>
        <div class="friendsContainer" v-if="chatMode" :class="{chatContainer: chatMode}">
            <div class="chatContainerBg">
                <div class="chatDialogs" id="chatDialogs">
                    <div v-for="chat in chatFriendData.currentChat" class="privateChatMessage" :key="chat.friendId">
                        <span :class="{privateChatDateLeft: !chat.me, privateChatDateRight: chat.me}">{{ new Date(chat.time * 1000).getHours() + ":" + new Date(chat.time * 1000).getMinutes() }}</span>
                        <span :class="{privateChatMessageUser: !chat.me, privateChatMessageMe: chat.me}">{{ chat.message }}</span>
                    </div>
                </div>
                <div class="chatBottomBar">
                    <textarea class="privateChatTextArea" id="privateChatTextArea" :class="{flood: flood}" @keyup.enter="sendChatMessage" :disabled="!chatFriendData.friendData.online || flood" maxlength="500" v-model="chatInput"></textarea>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { Draggable } from 'draggable-vue-directive'
    import Engine from "../../../game/Engine"
    import UIComponent from '../../../game/engine/ui/components/UIComponentEnum';

    export default {
        name: "FriendsGui",
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
                    handle: undefined,
                    onDragStart: () => {
                        //
                    }
                },
                currentTab: 'friends',//friends - requests - search
                searchValue: "",
                /* Search tab use this*/
                friendsBox: [],
                friendsList: [
                   /* {
                        id: 0,
                        username: "asdas",
                        look: "asdsa",
                        visible: true,
                        notifications: 10,
                        online: false
                    },
                    {
                        id: 1,
                        username: "test",
                        look: "asdas23",
                        visible: true,
                        notifications: 10,
                        online: true
                    }*/
                ],
                chatMode: false,
                chatFriendData: {
                    title: "",
                    friendData: {},
                    chatMessages: [
                        /* {
                       fromId: 0,
                             messages: [
                                 {
                                     me: false,
                                     time: Math.floor(Date.now() / 1000),
                                     message: "test message"
                                 },
                                 {
                                     me: true,
                                     time: Math.floor(Date.now() / 1000),
                                     message: "adasd message"
                                 }
                             ]
                         }*/
                    ],
                    currentChat: []
                },
                friendSearchFound: true,
                friendRequests: [
                   /* {
                        id: 0,
                        username: "asdas",
                        look: "asdsa",
                        visible: true
                    }*/
                ],
                chatInput: "",
                friendsRequestsSent: [],
                flood: false
            }
        },
        watch: {
            searchValue: function (value) {
                switch (this.currentTab) {
                    case 'friends':
                        this.friendsList.forEach((fR) => {
                            let exp = new RegExp('^' + value, 'i');
                            let match = exp.test(fR.username);
                            fR.visible = match
                        })
                        break;
                    case 'requests':
                        this.friendRequests.forEach((fR) => {
                            let exp = new RegExp('^' + value, 'i');
                            let match = exp.test(fR.username);
                            fR.visible = match
                        })
                        break;
                    case 'search':
                        break;
                }
            }
        },
        methods: {
            closeGui()
            {
                return Engine.getInstance().getUserInterfaceManager().getUIComponentManager().getComponent(UIComponent.FriendsMenuUI).hide()
            },
            chatFriend(friend)
            {
                return friend;
            },
            sendRequest(id, user)
            {
                user.enableRequest = false
                this.friendsRequestsSent.push(id)
            },
            acceptRequest(id)
            {
                return id;
            },
            declineRequest(id)
            {
            
                this.friendRequests = this.friendRequests.filter((req) => {
                    return req.id !== id
                })
            },
            followFriend(id)
            {
                return id;
            },
            openPacket()
            {
                
            },
            changeTab(tab)
            {
                switch (tab) {
                    case 'friends':
                        this.currentTab = tab;
                        break;
                    case 'requests':
                        this.currentTab = tab;
                        break;
                    case 'search':
                        this.currentTab = tab;
                        break;
                }
            },
            searchButtonMethod()
            {
                if(this.searchValue == "" || this.searchValue == null)
                    return;

                
            },
            sendChatMessage()
            {

                let chat = this.chatFriendData.chatMessages.filter((item) => item.fromId == this.chatFriendData.friendData.id)

                if(chat.length == 0)
                {
                    this.chatFriendData.chatMessages.push(
                        {
                            fromId: this.chatFriendData.friendData.id,
                            messages: [
                                {
                                    me: true,
                                    time: Math.floor(Date.now() / 1000),
                                    message: this.chatInput
                                }]
                        }
                    )

                    this.chatFriendData.currentChat = this.chatFriendData.chatMessages.filter((item) => item.fromId == this.chatFriendData.friendData.id)[0].messages;
                }
                else
                {
                    for(let element in this.chatFriendData.chatMessages)
                    {
                        if(this.chatFriendData.chatMessages[element].fromId == this.chatFriendData.friendData.id)
                        {
                            this.chatFriendData.chatMessages[element].messages.push(
                                {
                                    me: true,
                                    time: Math.floor(Date.now() / 1000),
                                    message: this.chatInput
                                })
                        }
                    }
                }

                document.getElementById('chatDialogs').scrollTop = document.getElementById('chatDialogs').scrollHeight
                this.chatInput = ""
            }
        },
        mounted()
        {
            this.dragBox.handle = this.$refs.handler;

            this.openPacket();

            /*this.$refs.messengerSearchInput.addEventListener('keyup', (event) => {
                if(this.currentTab != 'requests' || this.currentTab != 'friends')
                    return;

                let value = event.target.value;
                let exp = new RegExp('^' + value, 'i');


                this.friendsBox.forEach((friend) => {
                    let isMatch = exp.test(friend.username);
                    friend.visible = isMatch;
                })
            })*/
        }
    }
</script>
