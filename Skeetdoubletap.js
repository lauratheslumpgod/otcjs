var time, delay, fillbar, shotsfired;
var Xoffset = 'Indicator X offset';
var Yoffset = 'Indicator Y offset';

//Weapon fire event
function EVENT_WEAPON_FIRE()
{
    iShotsFired = Event.GetInt("userid"); iShotsFired_index = Entity.GetEntityFromUserID(iShotsFired);

    if(Entity.GetLocalPlayer() == iShotsFired_index)
    {
            //Released only once
            if(shotsfired == 0)
            {
                time = Globals.Curtime();
                delay = time+0.3;
                fillbar = 0;
            }            
    }  
}

//Draw
function HUD_REDRAW()
{

    if(UI.GetValue( "Rage", "GENERAL", "Exploits", "Doubletap" ))
    {
        font = Render.AddFont("Verdana Bold", 16, 500);
           const fontpixel = Render.AddFont( "Verdana Bold", 7, 100);
   
        //Enabled
        if(UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap"))
        {
            curtime = Globals.Curtime();
       
            //>_<
            if (curtime < delay)
            {
                fillbar+=1;
                shotsfired = 1;  
         
                //Not allowing fill more
                if(fillbar > 60);
                Render.StringCustom(Global.GetScreenSize()[0]/49+UI.GetValue(Xoffset), Global.GetScreenSize()[1]-349+UI.GetValue(Yoffset), 1, "DT", [ 0, 0, 0, 255 ], font);
                Render.StringCustom(Global.GetScreenSize()[0]/50+UI.GetValue(Xoffset), Global.GetScreenSize()[1]-350+UI.GetValue(Yoffset), 1, "DT", [ 255, 0, 0, 255 ], font);
            }
            else
            {
                Render.StringCustom(Global.GetScreenSize()[0]/49+UI.GetValue(Xoffset), Global.GetScreenSize()[1]-349+UI.GetValue(Yoffset), 1, "DT", [ 0, 0, 0, 255 ], font);  
                Render.StringCustom(Global.GetScreenSize()[0]/50+UI.GetValue(Xoffset), Global.GetScreenSize()[1]-350+UI.GetValue(Yoffset), 1, "DT", [ 0, 255, 0, 255 ], font);  
                shotsfired = 0;    //Released
            }  
        }
        else
        {
            //Disabled
            Render.StringCustom(Global.GetScreenSize()[0]/50+UI.GetValue(Xoffset), Global.GetScreenSize()[1]-350+UI.GetValue(Yoffset), 1, "DT", [ 255, 50, 50, 0 ], font);
        }  
    }  
}

function can_shift_shot(ticks_to_shift) {
    var me = Entity.GetLocalPlayer();
    var wpn = Entity.GetWeapon(me);

    if (me == null || wpn == null)
        return false;

    var tickbase = Entity.GetProp(me, "CCSPlayer", "m_nTickBase");
    var curtime = Globals.TickInterval() * (tickbase-ticks_to_shift)

    if (curtime < Entity.GetProp(me, "CCSPlayer", "m_flNextAttack"))
        return false;

    if (curtime < Entity.GetProp(wpn, "CBaseCombatWeapon", "m_flNextPrimaryAttack"))
        return false;

    return true;
}

function _TBC_CREATE_MOVE() {
    var is_charged = Exploit.GetCharge()

    Exploit[(is_charged != 1 ? "Enable" : "Disable") + "Recharge"]()

    if (can_shift_shot(14) && is_charged != 1) {
        Exploit.DisableRecharge();
        Exploit.Recharge()
    }

    Exploit.OverrideTolerance(0);
    Exploit.OverrideShift(14);
}

function _TBC_UNLOAD() {
    Exploit.EnableRecharge();
}
function Main()
{
    Global.RegisterCallback("CreateMove", "_TBC_CREATE_MOVE");
    Global.RegisterCallback("Unload", "_TBC_UNLOAD");
    Global.RegisterCallback("Draw", "HUD_REDRAW");
    Global.RegisterCallback("weapon_fire", "EVENT_WEAPON_FIRE");
    UI.AddLabel("________________________________________");
    UI.AddLabel("                izumi private DT                ");
    UI.AddSliderInt(Xoffset, -1000, 2000);
    UI.AddSliderInt(Yoffset, -1000, 1000);
    UI.AddLabel("________________________________________");
}

Main();