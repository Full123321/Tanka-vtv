import { Build, BuildBlocksSet, Teams, Damage, BreackGraph, Ui, Properties, GameMode, Spawns, room, Timers } from 'pixel_combats/room';
import * as peace from './options.js';
import * as teams from './default_teams.js';

// разрешения
room.PopupsEnable = true;
Damage.FriendlyFire = false;
BreackGraph.OnlyPlayerBlocksDmg = false;
BreackGraph.WeakBlocks = true;
// делаем возможным ломать все блоки
BreackGraph.BreackAll = true;
// показываем количество квадов
Ui.GetContext().QuadsCount.Value = true;
// разрешаем все чистые блоки
Build.GetContext().BlocksSet.Value = BuildBlocksSet.AllClear;
// вкл строительные опции
peace.set_editor_options();

// урон включён
Damage.GetContext().DamageOut.Value = true;

// параметры игры
Properties.GetContext().GameModeName.Value = "GameModes/EDITOR";

// создаём только синюю команду
teams.create_team_blue();

// разрешаем вход в команды по запросу
Teams.OnRequestJoinTeam.add_Event(function (player, team) { team.Add(player); });
// спавн по входу в команду
Teams.OnPlayerChangeTeam.add_Event(function (player) { player.Spawns.Spawn(); });

// конфигурация инвентаря
peace.set_editor_inventory();

// моментальный спавн
Spawns.GetContext().RespawnTime.Value = 0;

// === РАДУЖНАЯ НАДПИСЬ + АПТАЙМ ===
var uptimeSeconds = 0;
try {
    var rainbowTimer = Timers.GetContext().Get("Rainbow");
    rainbowTimer.RestartLoop(1);
    rainbowTimer.OnTimer.Add(function() {
        uptimeSeconds++;
        var colors = ["#FF0000","#FF7F00","#FFFF00","#00FF00","#00FFFF","#0000FF","#8B00FF"];
        var colorIdx = Math.floor(uptimeSeconds / 2) % colors.length;
        Ui.GetContext().Hint.Value = "<color=" + colors[colorIdx] + ">тяночка занята!</color>";
    });
} catch(e) {
    Ui.GetContext().Hint.Value = "тяночка занята!";
}
