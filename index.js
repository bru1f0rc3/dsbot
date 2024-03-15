const { stringify } = require('querystring');
const { token, id, dev_token } = require('./config.json');
const { Client, Events, GatewayIntentBits, SlashCommandBuilder, ApplicationCommand, ApplicationCommandOptionType } = require('discord.js');
const { get } = require('http');
const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

bot.once(Events.ClientReady, c => {
    console.log(` ${c.user.tag} online`);
    setInterval(playersCheck, 10000)
    const players = new SlashCommandBuilder()
        .setName('players')
        .setDescription('Activity players EggWars');
      

    bot.application.commands.create(players, id)
    
});


bot.on(Events.InteractionCreate, async interaction => {


    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "players") {
        await interaction.reply(string);
    }
})


bot.login(token);

var string;
async function playersCheck() {
    console.time("1")
    let rest = await fetch(`https://api.vimeworld.com/match/latest?count=100&` + dev_token);
    let con = await rest.json();
    let arr = [];
    const dateEnd = con[1].date - 1500;
    let lastmatch;
    var res = 0;
    let newArr = [];
    for (let i = 0; i < 100; i++) {
        if (con[i].game === "EGGWARS") {
            arr[res] = con[i].id;
            res++;
        }
        if (i == 99) {
            lastmatch = con[i].id;
            console.log(lastmatch);
        }
    }
    
    let rest2;
    let con2;
    for (let j = 0; j < 10; j++) {
        rest2 = await fetch(`https://api.vimeworld.com/match/list?count=100&before=${lastmatch}`);
        con2 = await rest2.json();

        for (let i = 0; i < 100; i++) {
            if (con2[i].game === "EGGWARS") {
                arr[res] = con2[i].id;
                res++;
            }
            if (i == 99) {
                lastmatch = con2[i].id;
                console.log(lastmatch);
            }

        }
        if (con2[j].date < dateEnd) {
            break;
        }
    }

    if (res != 0) {
        let matches;
        let cod;
        let players = [];
        let playersMatch = [];
        let cheked = 0;
        for (let i = 0; i < res; i++) {
            matches = await fetch(`https://api.vimeworld.com/match/` + arr[i] + `?` + dev_token);

            cod = await matches.json();
            playersMatch = cod.players;

            console.log(playersMatch.length);
            for (let g = 0; g < playersMatch.length; g++) {
                players[g + cheked] = playersMatch[g].id;
            }
            cheked = players.length;
            console.log(cheked + ` cheked`)
            console.log(players.length);

        }
        let playersIds = [];
        for (let i = 0; i < players.length; i++) {

            if (!~playersIds.indexOf(players[i])) {
                playersIds.push(players[i]);
            }

        }
        let ss = playersIds.length / 50;
        let online = [];
        let usernamesPlayedEggWars = [];
        let usernamesPlayedEggWarsCounter = 0;

        console.log(`playersMatch`);
        for (let i = 0; i < arr.length; i++) {
            newArr[i] = `https://vimetop.ru/matches#${arr[i]}`;
        }

        string = newArr.join('\n');
        // interaction.reply(string);
        console.log(`${res} = res`)
        console.log(arr)
        console.log(ss)
        console.log(playersIds.length)
        // console.log(playersIds)
        let playersIdFetch;
        let response;
        let counter;
        let dif;
        let u = 0;



        if (playersIds.length >= 50) {
            for (let i = 0; i < playersIds.length; i += 50) {

                if (i > playersIds.length - 50) {
                    console.log(i)
                    dif = playersIds.length - i;
                    counter = i;
                    break;
                }

                playersIdFetch = await fetch(`https://api.vimeworld.com/user/session/` + playersIds[i + 0] + `,` + playersIds[i + 1] + `,` + playersIds[i + 2] + `,` +
                    playersIds[i + 3] + `,` + playersIds[i + 4] + `,` + playersIds[i + 5] + `,` +
                    playersIds[i + 6] + `,` + playersIds[i + 7] + `,` + playersIds[i + 8] + `,` + playersIds[i + 9] + `,` +
                    playersIds[i + 10] + `,` + playersIds[i + 11] + `,` + playersIds[i + 12] + `,` +
                    playersIds[i + 13] + `,` + playersIds[i + 14] + `,` + playersIds[i + 15] + `,` +
                    playersIds[i + 16] + `,` + playersIds[i + 17] + `,` + playersIds[i + 18] + `,` + playersIds[i + 19] + `,` +
                    playersIds[i + 20] + `,` + playersIds[i + 21] + `,` + playersIds[i + 22] + `,` +
                    playersIds[i + 23] + `,` + playersIds[i + 24] + `,` + playersIds[i + 25] + `,` +
                    playersIds[i + 26] + `,` + playersIds[i + 27] + `,` + playersIds[i + 28] + `,` + playersIds[i + 29] + `,` +
                    playersIds[i + 30] + `,` + playersIds[i + 31] + `,` + playersIds[i + 32] + `,` +
                    playersIds[i + 33] + `,` + playersIds[i + 34] + `,` + playersIds[i + 35] + `,` +
                    playersIds[i + 36] + `,` + playersIds[i + 37] + `,` + playersIds[i + 38] + `,` + playersIds[i + 39] + `,` +
                    playersIds[i + 40] + `,` + playersIds[i + 41] + `,` + playersIds[i + 42] + `,` +
                    playersIds[i + 43] + `,` + playersIds[i + 44] + `,` + playersIds[i + 45] + `,` +
                    playersIds[i + 46] + `,` + playersIds[i + 47] + `,` + playersIds[i + 48] + `,` + playersIds[i + 49] + `?` + dev_token);

                response = await playersIdFetch.json();
                console.log(response);
                console.log(response[49].online.game);

                for (let g = 0; g < 50; g++) {
                    if (response[g].online.game === "EGGWARS") {
                        online[u] = response[g].username;
                        u++;
                        console.log(u);
                    }
                    if (response[g].online.value === true && response[g].online.game != "EGGWARS") {
                        usernamesPlayedEggWars[usernamesPlayedEggWarsCounter] = response[g].username;
                        usernamesPlayedEggWarsCounter++;
                    }
                }

            }
            console.log(dif)
            for (let g = 0; g < dif; g += 2) {
                if (dif - g != 1) {
                    playersIdFetch = await fetch(`https://api.vimeworld.com/user/session/` + playersIds[g + 0 + counter] + `,` + playersIds[g + 1 + counter] + `?` + dev_token);
                    response = await playersIdFetch.json();
                    console.log(response[0].username)
                    for (let i = 0; i < 2; i++) {
                        if (response[i].online.game === "EGGWARS") {
                            online[u] = response[i].username;
                            u++;
                            console.log(`u`);
                        }
                        if (response[i].online.value === true && response[i].online.game != "EGGWARS") {
                            usernamesPlayedEggWars[usernamesPlayedEggWarsCounter] = response[i].username;
                            usernamesPlayedEggWarsCounter++;
                        }
                    }
                }
                if (dif - g === 1) {
                    playersIdFetch = await fetch(`https://api.vimeworld.com/user/session/` + playersIds[g + 0 + counter] + `?` + dev_token);
                    response = await playersIdFetch.json();
                    if (response[0].online.game === "EGGWARS") {
                        online[u] = response[0].username;
                        u++;
                        console.log(u);
                    }
                    if (response[0].online.value === true && response[0].online.game != "EGGWARS") {
                        usernamesPlayedEggWars[usernamesPlayedEggWarsCounter] = response[0].username;
                        usernamesPlayedEggWarsCounter++;
                    }
                }
            }
        }
        if (playersIds.length < 50) {
            for (let i = 0; i < playersIds.length; i += 2) {
                if (playersIds.length - i != 1) {
                    playersIdFetch = await fetch(`https://api.vimeworld.com/user/session/` + playersIds[i + 0] + `,` + playersIds[i + 1] + "?" + dev_token);

                    response = await playersIdFetch.json();
                    console.log(response)
                    for (let g = 0; g < 2; g++) {
                        if (response[g].online.game === "EGGWARS") {
                            online[u] = response[g].username;
                            u++;
                        }
                        if (response[g].online.value === true && response[g].online.game != "EGGWARS") {
                            usernamesPlayedEggWars[usernamesPlayedEggWarsCounter] = response[g].username;
                            usernamesPlayedEggWarsCounter++;
                        }
                    }
                }
                if (playersIds.length - i === 1) {
                    playersIdFetch = await fetch(`https://api.vimeworld.com/user/session/` + playersIds[i + 0] + `?` + dev_token);

                    response = await playersIdFetch.json();
                    for (let g = 0; g < 1; g++) {
                        if (response[g].online.game === "EGGWARS") {
                            online[u] = response[g].username;
                            u++;
                            console.log(u);
                        }
                        if (response[g].online.value === true && response[g].online.game != "EGGWARS") {
                            usernamesPlayedEggWars[usernamesPlayedEggWarsCounter] = response[g].username;
                            usernamesPlayedEggWarsCounter++;
                        }
                    }
                }
            }
        }

        console.log(playersIds)
        console.log(online)
        console.log(usernamesPlayedEggWars)

        console.log(dif)
        console.log(playersIds.length)
        console.log("123");
        console.log(arr)
        let stringOnline = online.join(',  ');
        let stringUsernamesPlayedEggWars = usernamesPlayedEggWars.join(', ')
        console.log(string);
        console.timeEnd("1")
        if (online.length == 0 || usernamesPlayedEggWars.length == 0) {
            if (online.length != 0) {
                string = `${string} \n\nIn EggWars:` + "```" + `${stringOnline}\n\n` + "```";
            }
            if (usernamesPlayedEggWars != 0) {
                string = `${string} \n\nPlayed EggWars:` + "```" + `${stringUsernamesPlayedEggWars}` + "```";
            }
        }
        if (online.length != 0 && usernamesPlayedEggWars.length != 0) {
            string = `${string} \n\nIn EggWars:` + "```" + `${stringOnline}\n\n` + "```" + `Played EggWars:` + "```" + `${stringUsernamesPlayedEggWars}` + "```";
        }

        return;

    }

    if (res == 0) {
        string = `No players in game.`;
    }

}