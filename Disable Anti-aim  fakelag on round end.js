function roundEndListener() {
    if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Disable AA on round end"))
        UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Enabled", false)
   
    if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Disable fakelag on round end"))
        UI.SetValue("Anti-Aim", "Fake-Lag", "Enabled", false)
}
function roundStartListener(){
    if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Disable AA on round end"))
        UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Enabled", true)
   
    if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Disable fakelag on round end"))
        UI.SetValue("Anti-Aim", "Fake-Lag", "Enabled", true)
}

function main() {
    UI.AddCheckbox("Disable AA on round end");
    UI.AddCheckbox("Disable fakelag on round end");
   
    Global.RegisterCallback('round_end', 'roundEndListener');
    Global.RegisterCallback('round_start', 'roundStartListener');
}

main();