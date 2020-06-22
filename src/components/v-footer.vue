<template>
    <div class="footer">
        <div class="fluid-container footer">
            <div class="link-group">
                <a>Links</a>
                <ul>
                    <li>
                        <a href="https://github.com/osu-astellia">Github</a>
                    </li>
                </ul>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "v-footer"
    }
</script>

<style scoped>

    .footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 100px;
        line-height: 60px;
        background-color: #21263E;
        display: flex;
    }

    .link-group:first-child {
        margin: 0 50px;
    }

    .link-group {
        display: inline;
    }
    .link-group-name {
        font-size: 16px;

        text-align: center;
    }
    * {
        color: white;
    }

    ul {
        list-style-type: none;
        padding: 0 0 !important;
    }

</style>