<template>
    <div class="docsBox" v-html="this.text">
    </div>
</template>
<script>
    import bbCodeParser from 'js-bbcode-parser';

    export default {
        name: "v-rules",
        data(){
            return {
                text: `

                [h1]Astellia rules[/h1]

                [h2]Total[/h2]

                1.1 Ignorance of the rules does not exempt from liability.[br]
                1.2 By playing on our servers you agree to the Privacy Policy of the Consumer Rights.[br]
                1.3 The administration of the project has the right to change server rules.[br]
                1.4 A project is not a way to earn money, osu! is a product of ppy.sh.[br]
                1.5 GMT and DM are trusted persons of the project.[br]



                [h2] 2. General GMT / DM Rules [/h2]

                2.1 GMT /DM must use commands !kick [reason]!mute[reason] !ban[reason].[br]
                2.2 GMT /DM is an Assistant to the Project Administration.[br]
                2.3 GMT / DM is selected by the administration representatives independently and is not subject to discussion.[br]
                2.4 GMT / DM is obliged to comply with all the above rules and to punish players only for the reason that the rule is broken.[br]
                2.5 GMT / DM shall not have any additional obligations to the players other than those mentioned above and shall have the full right to refuse to help them.[br]
                2.6 GMT / DM server can not punish or defend the player for personal reasons.[br]
                GMT / DM Server is obliged to deal with conflict situations of the players.[br]
                2.7 GMT / DM server without understanding the situation, must contact the Administrator to
                help.[br]
                2.8 GMT / DM must always be responsible for what he does on the server.[br]
                2.9 GMT / DM server can not kick, ban, player without serious reason.[br]
                2.10 GMT / DM must not use authority for its own purposes.[br]



                [h2] 3. Text chat rules. [/h2]

                3.1 Any use of server vulnerabilities is forbidden.[br]
                3.2 Foul language is forbidden.[br]
                3.3 Insult to the server administration[br]
                3.4 Insulting names and names that do not make any sense, for example, are forbidden: "slqwqd1212" "lo12113" and so on.[br]
                3.5 It is forbidden to advertise other projects in text channels.[br]

                [h2] 4. Other [/h2]

                4.1 A project does not refund funds, all collected funds go to support the server.[br]
                4.2 The project does not return server roles.[br]
                4.3 Begging in one form or another is prohibited (extortion is also equivalent to this rule).[br]
                4.4 It is forbidden to use self-bots[br]
                `
            }
            },
        mounted() {
            this.text = bbCodeParser.parse(this.text)
        }
    }
</script>

<style scoped>
.docsBox {
    margin: 20px auto;
    background-color: #1F2036;
    color: white;
    padding: 30px 0;
}
</style>