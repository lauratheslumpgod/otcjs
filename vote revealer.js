var options = []
function onVoteOptions() {
    options[0] = Event.GetString("option1")
    options[1] = Event.GetString("option2")
    options[2] = Event.GetString("option3")
    options[3] = Event.GetString("option4")
    options[4] = Event.GetString("option5")
}
function onVoteCast() {
    var entid = Event.GetInt("entityid");
    if (entid) {
        var team = Event.GetInt("team");
        var option = Event.GetInt("vote_option");
        var name = Entity.GetName(entid);
        var chTeam = "null";
        switch (team) {
            case 0: chTeam = "[N] "; break; case 1: chTeam = "Spectators: "; break;
            case 2: chTeam = "Terrorist team: "; break; case 3: chTeam = "Counter-Terrorist team: "; break;
            default: chTeam = "Unknown Team: "; break;
        }
        
        var vote = options[option];
        Global.PrintColor([ 105, 110, 255, 255 ], "[retardware.xd] \0");
        Global.PrintColor([ 230, 178, 203, 255 ], chTeam + "player " + name + " voted " + vote + "\n");
        Global.PrintChat("[Vote Revealer] " + chTeam + "player " + name + " voted " + vote);
    }
}
Global.RegisterCallback("vote_options", "onVoteOptions");
Global.RegisterCallback("vote_cast", "onVoteCast");