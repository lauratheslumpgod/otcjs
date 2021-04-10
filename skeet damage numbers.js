/*
Quake Flying damage numbers...
Author какойта чел
*/

//Vars
var iVictim_index, First_pos, Second_pos, Third_pos, Fourth_pos, Fifth_pos, First, Second, Third, Fourth, Five, iDamageCount = iOffsetCount = YOffsetFirst = YOffsetSecond = YOffsetThird = YOffsetFourth = YOffsetFive = loadFont = HitAttack = 0;  

//Store coordinates array
const first_screen_pos = [], second_screen_pos = [], third_screen_pos = [], fourth_screen_pos = [], fifth_screen_pos = [];

//>_<
//Damage event
function EVENT_PLAYER_HURT()
{
    //Get attacker
    iAttacker = Event.GetInt("attacker"); iAttacker_index = Entity.GetEntityFromUserID(iAttacker);
   
    //Get victim
    iVictim = Event.GetInt("userid"); iVictim_index = Entity.GetEntityFromUserID(iVictim);  
   
    if(Entity.GetLocalPlayer() == iVictim_index && Entity.GetLocalPlayer() !== iAttacker_index)    return;
   
    //BEGIN ANIM
    if(Entity.GetLocalPlayer() == iAttacker_index)
    {
        //First hit
        HitAttack = 1;
       
        //Reset every 5 hit
        if(iDamageCount == 5) iDamageCount = 0; if(iOffsetCount == 5) iOffsetCount = 0;
       
        //Collect them and set only 5 hits
        iDamageCount+=1;
       
        //This is offset for Y for each
        iOffsetCount+=1;        
       
        //This shit reads every hit with a new var...
        if(iDamageCount == 1)    {    First = Event.GetInt("dmg_health");    First_pos = Entity.GetRenderOrigin(iVictim_index);    }  
        if(iDamageCount == 2)    {    Second = Event.GetInt("dmg_health");    Second_pos = Entity.GetRenderOrigin(iVictim_index);    }              
        if(iDamageCount == 3)    {    Third = Event.GetInt("dmg_health");    Third_pos = Entity.GetRenderOrigin(iVictim_index);    }      
        if(iDamageCount == 4)    {    Fourth = Event.GetInt("dmg_health");    Fourth_pos = Entity.GetRenderOrigin(iVictim_index);    }      
        if(iDamageCount == 5)    {    Five = Event.GetInt("dmg_health");    Fifth_pos = Entity.GetRenderOrigin(iVictim_index);    }

        //Setup offsets
        if(iOffsetCount == 1)    YOffsetFirst = 255; if(iOffsetCount == 2)    YOffsetSecond = 255; if(iOffsetCount == 3)    YOffsetThird = 255; if(iOffsetCount == 4)    YOffsetFourth = 255; if(iOffsetCount == 5)    YOffsetFive = 200;              
    }      
}

function HUD_REDRAW()
{
    //Once and lock font load
    if(loadFont == 0)
    {
        //this font u can get here https://onetap.su/threads/beta-in-development-onetap-hud-engine-0-1-dev-18945-18952-dec-27-2019.13647/
        fontSM2 = Render.AddFont("Verdana", 8, 550)
        loadFont = 1;
    }
   
    /*Render.StringCustomCustom(Global.GetScreenSize()[0]/2, Global.GetScreenSize()[1]/2, 1, "" + iDamageCount, [ 255, 255, 255, 255 ], fontSM2);
    Render.StringCustomCustom(Global.GetScreenSize()[0]/2, Global.GetScreenSize()[1]/2+50, 1, "" + iOffsetCount, [ 255, 255, 255, 255 ], fontSM2);*/

    //Stop flooding
    if(!HitAttack || !getCustomValue('Quake Damage Numbers'))    return;

    //Doing cycle through all players will affect on FPS heavily... so
    if(Entity.IsValid(iVictim_index))
    {
         
   
        //Setup x,y,z
        if(iDamageCount < 6)    
		{
			first_screen_pos = Render.WorldToScreen(First_pos);
			second_screen_pos = Render.WorldToScreen(Second_pos);
			third_screen_pos = Render.WorldToScreen(Third_pos);
			fourth_screen_pos = Render.WorldToScreen(Fourth_pos);
			fifth_screen_pos = Render.WorldToScreen(Fifth_pos);
		}
		
		color = UI.GetColor("MISC", "JAVASCRIPT", "Script items", "DMG Color");
        //Five pieces of damage, the hell
			Render.StringCustom(first_screen_pos[0]-15+1, first_screen_pos[1]-50+YOffsetFirst-255+1, 1, "" + First, [ 0, 0,0, YOffsetFirst ], fontSM2);
			Render.StringCustom(first_screen_pos[0]-15, first_screen_pos[1]-50+YOffsetFirst-255, 1, "" + First, alp( color, YOffsetFirst ), fontSM2);
		
			Render.StringCustom(second_screen_pos[0]+15+1, second_screen_pos [1]-50+YOffsetSecond-255+1, 1, "" + Second, [ 0, 0, 0, YOffsetSecond ], fontSM2);
			Render.StringCustom(second_screen_pos[0]+15, second_screen_pos [1]-50+YOffsetSecond-255, 1, "" + Second, alp( color, YOffsetSecond ), fontSM2);
		
			Render.StringCustom(third_screen_pos[0]-25+1, third_screen_pos[1]-50+YOffsetThird-255+1, 1, "" + Third, [ 0,0,0, YOffsetThird ], fontSM2);
			Render.StringCustom(third_screen_pos[0]-25, third_screen_pos[1]-50+YOffsetThird-255, 1, "" + Third, alp( color, YOffsetThird ), fontSM2);
		
			Render.StringCustom(fourth_screen_pos[0]+25+1, fourth_screen_pos[1]-50+YOffsetFourth-255+1, 1, "" + Fourth, [ 0, 0, 0, YOffsetFourth ], fontSM2);
			Render.StringCustom(fourth_screen_pos[0]+25, fourth_screen_pos[1]-50+YOffsetFourth-255, 1, "" + Fourth, alp(color, YOffsetFourth ), fontSM2);
		
			Render.StringCustom(fifth_screen_pos[0]-10+1, fifth_screen_pos[1]-50+YOffsetFive-255+1, 1, "" + Five, [ 0, 0, 0, YOffsetFive ], fontSM2);
			Render.StringCustom(fifth_screen_pos[0]-10, fifth_screen_pos[1]-50+YOffsetFive-255, 1, "" + Five, alp( color, YOffsetFive ), fontSM2);
		
    }      
}  

function getCustomValue(name)
{
    var value = UI.GetValue("MISC", "JAVASCRIPT", "Script items", name);
    return value;
}

function pushY()
{
	//Push Y
        if(YOffsetFirst > 1)    YOffsetFirst--; if(YOffsetSecond > 1)    YOffsetSecond--; if(YOffsetThird > 1)    YOffsetThird--; if(YOffsetFourth > 1)    YOffsetFourth--; if(YOffsetFive > 1)    YOffsetFive--; 
}

function alp(c, a) {
  return [c[0], c[1], c[2], a]
}

function Main()
{
    Global.RegisterCallback("Draw", "HUD_REDRAW");
    Global.RegisterCallback("player_hurt", "EVENT_PLAYER_HURT");
	Global.RegisterCallback("CreateMove", "pushY");
    UI.AddCheckbox('Quake Damage Numbers');
	UI.AddColorPicker("DMG Color");
	UI.AddCheckbox("Premade Settings");
}

Main();
