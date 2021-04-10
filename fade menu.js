function test() {
    Cheat.Print("aa");
}

closingMenu = false;

currentColor = [0, 0, 0, 0]
function drawFunc() {
    maxAlpha = UI.GetValue("Menu background alpha:");
    
    Render.FilledRect(0, 0, 2560, 1440, currentColor);
    
    if (UI.GetValue("Fade:")  && currentColor[3] < maxAlpha && UI.IsMenuOpen()) {
        currentColor[3]++;
    }
    else if (UI.GetValue("Fade:") && currentColor[3] > 0 && !UI.IsMenuOpen()) {
        currentColor[3]--;
    }
    else if (UI.GetValue("Fade:") && currentColor[3] > UI.GetValue("Menu background alpha:")) {
        currentColor[3]--;
    }
    
    //No fadein/fadout
    else if (!UI.GetValue("Fade:") && UI.IsMenuOpen()) {
        currentColor[3] = maxAlpha;
    }
    else if (!UI.GetValue("Fade:") && !UI.IsMenuOpen()) {
        currentColor[3] = 0;
    }

}

function main() {
    
    UI.AddSliderInt("Menu background alpha:", 30, 255);
    UI.AddCheckbox("Fade:");
    Cheat.RegisterCallback("Draw", "drawFunc");
}

main();