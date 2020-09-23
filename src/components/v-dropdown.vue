<template>
    <div class="menu-item" @click="isOpen = !isOpen">
        <a href="#">
            {{ title }}
        </a>

        <transition name="fade" appear>
            <div class="sub-menu" v-if="isOpen">
                <div v-for="(item, i) in items" :key="i" class="menu-item">
                    <router-link :to="item.link">{{ item.title }}</router-link>
                </div>
            </div>
        </transition>
    </div>
</template>


<script>
    export default {
        name: "v-dropdown",
        props: ['title', 'items'],
        data () {
            return {
                isOpen: false
            }
        }

    }
</script>

<style scoped>
    nav .menu-item svg {
        width: 10px;
        margin-left: 10px;
    }

    nav .menu-item .sub-menu {
        position: absolute;
        background-color: #222;
        top: calc(100% + 18px);
        left: 50%;
        transform: translateX(-50%);
        width: max-content;
        border-radius: 0px 0px 16px 16px;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: all .5s ease-out;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
</style>