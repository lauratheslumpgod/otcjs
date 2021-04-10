UI.AddLabel("------------Visuals------------");
const screen_size = Global.GetScreenSize();
var stored = false;
var x_offs = 0;
var y_offs = 0;
UI.AddSliderInt("binds x", 0, screen_size[0]);
UI.AddSliderInt("binds y", 0, screen_size[1]);
UI.SetEnabled("Script items", "binds x", false);
UI.SetEnabled("Script items", "binds y", false);
const in_bounds = function(vec, x, y, x2, y2) {
    return (vec[0] > x) && (vec[1] > y) && (vec[0] < x2) && (vec[1] < y2)
}
const keybinds = function() {
    var keybinds = [];
    if (UI.IsMenuOpen()) {                                                       keybinds.push("Menu is Open") };
    if (UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Auto direction")) {            keybinds.push("Freestand") };
    if (UI.IsHotkeyActive("Rage", "Exploits", "Double tap")) {                   keybinds.push("Double Tap") };
    if (UI.IsHotkeyActive("Rage", "Exploits", "Hide shots")) {                   keybinds.push("Hide Shots") };
    if (UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck")) {                   keybinds.push("Fake Duck") };
    if (UI.IsHotkeyActive("Rage", "General", "General", "Force body aim")) {     keybinds.push("Body Aim") };
    if (UI.IsHotkeyActive("Rage", "General", "General", "Force safe point")) {   keybinds.push("Safe Points") };
    if (UI.IsHotkeyActive("Script items", "min damage")) {                       keybinds.push("Minimum Damage") };
  
    const x = UI.GetValue("Script items", "binds x"),
    y = UI.GetValue("Script items", "binds y");
    const font = Render.AddFont("Calibri", 13, 600);
    const active = Render.AddFont("Calibri", 11, 100);
    const icon = Render.AddFont("untitled-font-1", 14, 100);
    Render.FilledRect(x, y, 150, 25, [11, 11, 20, 200]);
    Render.StringCustom(x + 5, y + 3, 0, "a", [0, 130, 255, 255], icon);
    Render.StringCustom(x + 30, y + 1, 0, "Binds", [255, 255, 255, 255], font);
    Render.FilledRect(x, y + 24, 150, 24 + 19 * (keybinds.length - 1), [200, 200, 200, 15]);
    for (i = 0; i < keybinds.length; i++){
        Render.StringCustom(x + 3, y + 26 + 20 * i, 0, keybinds[i], [255, 255, 255, 255], active);
        Render.StringCustom(x + 132, y + 26 + 20 * i, 0, "on", [255, 255, 255, 255], active);
    }
  
    if(UI.IsMenuOpen() && Input.IsKeyPressed(0x1)){
        const mouse_pos = Global.GetCursorPosition();
        if (in_bounds(mouse_pos, x, y, x + 150, y + 40)) {
            if(!stored){
                x_offs = mouse_pos[0] - x;
                y_offs = mouse_pos[1] - y;
                stored = true;
            }
            UI.SetValue("Script items", "binds x", mouse_pos[0] - x_offs);
            UI.SetValue("Script items", "binds y", mouse_pos[1] - y_offs);
        }
    } else if(stored) stored = false;
}
Global.RegisterCallback("Draw", "keybinds");

const screen_size = Global.GetScreenSize();
var stored = false;
var x_offs = 0;
var y_offs = 0;
UI.AddSliderInt("spectators x", 0, screen_size[0]);
UI.AddSliderInt("spectators y", 0, screen_size[1]);
UI.SetEnabled("Script items", "spectators x", false);
UI.SetEnabled("Script items", "spectators y", false);
const in_bounds = function(vec, x, y, x2, y2) {
    return (vec[0] > x) && (vec[1] > y) && (vec[0] < x2) && (vec[1] < y2)
}
const get_spectators = function() {
    var spectators = [];
    const players = Entity.GetPlayers();
    for (i = 0; i < players.length; i++) {
        const cur = players[i];
        if (Entity.GetProp(cur, "CBasePlayer", "m_hObserverTarget") != "m_hObserverTarget") {
            const obs = Entity.GetProp(cur, "CBasePlayer", "m_hObserverTarget")
            if (obs === Entity.GetLocalPlayer()) {
                const name = Entity.GetName(cur);
                spectators.push(name);
            }
        }
    } return spectators;
}
const spectators = function() {
    const x = UI.GetValue("Script items", "spectators x"),
    y = UI.GetValue("Script items", "spectators y");
    const font = Render.AddFont("Calibri", 13, 600);
    const spects = Render.AddFont("Calibri", 11, 100);
    const icon = Render.AddFont("untitled-font-1", 14, 100);
    const names = get_spectators();
    Render.FilledRect(x, y, 160, 25, [11, 11, 20, 200]);
    Render.StringCustom(x + 5, y + 3, 0, "b", [0, 130, 255, 255], icon);
    Render.StringCustom(x + 30, y + 1, 0, "Spectators", [245, 245, 245, 255], font);
    Render.FilledRect(x, y + 24, 160, 24 + 19 * (names.length - 1), [200, 200, 200, 15]);
    for (i = 0; i < names.length; i++){
        Render.StringCustom(x + 30, y + 26 + 20 * i, 0, names[i], [245, 245, 245, 255], spects);
        Render.StringCustom(x + 6, y + 26 + 20 * i, 0, "d", [200, 200, 200, 255], icon);
    }
    if(UI.IsMenuOpen() && Input.IsKeyPressed(0x1)){
        const mouse_pos = Global.GetCursorPosition();
        if (in_bounds(mouse_pos, x, y, x + 150, y + 30)) {
            if(!stored){
                x_offs = mouse_pos[0] - x;
                y_offs = mouse_pos[1] - y;
                stored = true;
            }
            UI.SetValue("Script items", "spectators x", mouse_pos[0] - x_offs);
            UI.SetValue("Script items", "spectators y", mouse_pos[1] - y_offs);
        }
    } else if(stored) stored = false;
}
Global.RegisterCallback("Draw", "spectators");

const watermark = function() {
    const user = Cheat.GetUsername();
    const server = World.GetServerString();
    const ping = Math.round(Local.Latency() * 1000 - 16);
    const now = new Date();
    const hours = now.getHours(), mins = now.getMinutes(), secs = now.getSeconds();
    const time = (hours < 10 ? "0" + hours : hours) + ":" + (mins < 10 ? "0" + mins : mins) + ":" + (secs < 10 ? "0" + secs : secs);
    if(ping < 1) ping = 0;
    if(!server != "") server = "offline";

    const font = Render.AddFont("MuseoSansCyrl-900", 10, 900);
    const font1 = Render.AddFont("MuseoSansCyrl-900", 11, 900);

    const text = "|  "+ user +"  |  "+ ping +" ms  |  "+ server +"  |  "+ time +"";

    const w = Render.TextSizeCustom(text, font)[0] + 40;
    const x = Global.GetScreenSize()[0];
    x = x - w - 10;

    Render.FilledRect(x, 9, w - 2, 27, [11, 11, 20, 200]);
    Render.FilledRect(x - 1, 10, w, 25, [11, 11, 20, 200]);		
    Render.StringCustom(x + 33, 14, 0, text, [255, 255, 255, 255], font);

    Render.StringCustom(x + 6, 15, 0, "NL", [34, 179, 246, 255], font1);
    Render.StringCustom(x + 7, 14, 0, "NL", [255, 255, 255, 255], font1);
}

Cheat.RegisterCallback("Draw", "watermark");

/*
*
* Title: Neverlose
* Author: april#0001
* Description: Re-imagines the visuals for Onetap
*
*/

/*
*   DISCLAIMER
*
*   This plugin was not made with the intentions of re-creating another
*   software provider's visuals but, instead, to revamp Onetap's visuals
*   with a more minimalistic look. In order to not disobey the forum's rules,
*   the script automatically renders a watermark (in the top right corner),
*   containing the name of the software, your forum username and more additional
*   info. 
*
*   THIS WATERMARK SHOULD NOT BE EDITED OR REMOVED UNDER ANY CIRCUMSTANCES AND
*   DOING SO WILL PUT YOURSELF IN RISK OF GETTING BANNED FOR PASSING AS ANOTHER
*   SOFTWARE PROVIDER.
*
*   More info at https://www.onetap.com/threads/rules-scripts-releases.12549/
*
*/

//region api

// Localizing all of the functions in snake_case because why not.
const global_print = Global.Print, global_print_chat = Global.PrintChat, global_print_color = Global.PrintColor, global_register_callback = Global.RegisterCallback, global_execute_command = Global.ExecuteCommand, global_frame_stage = Global.FrameStage, global_tickcount = Global.Tickcount, global_tickrate = Global.Tickrate, global_tick_interval = Global.TickInterval, global_curtime = Global.Curtime, global_realtime = Global.Realtime, global_frametime = Global.Frametime, global_latency = Global.Latency, global_get_view_angles = Global.GetViewAngles, global_set_view_angles = Global.SetViewAngles, global_get_map_name = Global.GetMapName, global_is_key_pressed = Global.IsKeyPressed, global_get_screen_size = Global.GetScreenSize, global_get_cursor_position = Global.GetCursorPosition, global_play_sound = Global.PlaySound, global_play_microphone = Global.PlayMicrophone, global_stop_microphone = Global.StopMicrophone, global_get_username = Global.GetUsername, global_set_clan_tag = Global.SetClanTag, globals_tickcount = Globals.Tickcount, globals_tickrate = Globals.Tickrate, globals_tick_interval = Globals.TickInterval, globals_curtime = Globals.Curtime, globals_realtime = Globals.Realtime, globals_frametime = Globals.Frametime, sound_play = Sound.Play, sound_play_microphone = Sound.PlayMicrophone, sound_stop_microphone = Sound.StopMicrophone, cheat_get_username = Cheat.GetUsername, cheat_register_callback = cheat_register_callback = new Proxy(Cheat.RegisterCallback, { apply: function(_, _, args) { switch(args[0]) { case 'paint': Cheat.RegisterCallback('Draw', args[1]); break; case 'create_move': Cheat.RegisterCallback('CreateMove', args[1]); break; case 'fsn': Cheat.RegisterCallback('FrameStageNotify', args[1]); break; default: Cheat.RegisterCallback(args[0], args[1]); break; } } }), cheat_execute_command = Cheat.ExecuteCommand, cheat_frame_stage = Cheat.FrameStage, cheat_print = Cheat.Print, cheat_print_chat = Cheat.PrintChat, cheat_print_color = Cheat.PrintColor, local_latency = Local.Latency, local_get_view_angles = Local.GetViewAngles, local_set_view_angles = Local.SetViewAngles, local_set_clan_tag = Local.SetClanTag, local_get_real_yaw = Local.GetRealYaw, local_get_fake_yaw = Local.GetFakeYaw, local_get_spread = Local.GetSpread, local_get_inaccuracy = Local.GetInaccuracy, world_get_map_name = World.GetMapName, world_get_server_string = World.GetServerString, input_get_cursor_position = Input.GetCursorPosition, input_is_key_pressed = Input.IsKeyPressed, render_string = Render.String, render_text_size = Render.TextSize, render_line = Render.Line, render_rect = Render.Rect, render_filled_rect = Render.FilledRect, render_gradient_rect = Render.GradientRect, render_circle = Render.Circle, render_filled_circle = Render.FilledCircle, render_polygon = Render.Polygon, render_world_to_screen = Render.WorldToScreen, render_add_font = Render.AddFont, render_find_font = Render.FindFont, render_string_custom = Render.StringCustom, render_textured_rect = Render.TexturedRect, render_add_texture = Render.AddTexture, render_text_size_custom = Render.TextSizeCustom, render_get_screen_size = Render.GetScreenSize, ui_get_value = UI.GetValue, ui_set_value = UI.SetValue, ui_add_checkbox = UI.AddCheckbox, ui_add_slider_int = UI.AddSliderInt, ui_add_slider_float = UI.AddSliderFloat, ui_add_hotkey = UI.AddHotkey, ui_add_label = UI.AddLabel, ui_add_dropdown = UI.AddDropdown, ui_add_multi_dropdown = UI.AddMultiDropdown, ui_add_color_picker = UI.AddColorPicker, ui_add_textbox = UI.AddTextbox, ui_set_enabled = UI.SetEnabled, ui_get_string = UI.GetString, ui_get_color = UI.GetColor, ui_set_color = UI.SetColor, ui_is_hotkey_active = UI.IsHotkeyActive, ui_toggle_hotkey = UI.ToggleHotkey, ui_is_menu_open = UI.IsMenuOpen, convar_get_int = Convar.GetInt, convar_set_int = Convar.SetInt, convar_get_float = Convar.GetFloat, convar_set_float = Convar.SetFloat, convar_get_string = Convar.GetString, convar_set_string = Convar.SetString, event_get_int = Event.GetInt, event_get_float = Event.GetFloat, event_get_string = Event.GetString, entity_get_entities = Entity.GetEntities, entity_get_entities_by_class_i_d = Entity.GetEntitiesByClassID, entity_get_players = Entity.GetPlayers, entity_get_enemies = Entity.GetEnemies, entity_get_teammates = Entity.GetTeammates, entity_get_local_player = Entity.GetLocalPlayer, entity_get_game_rules_proxy = Entity.GetGameRulesProxy, entity_get_entity_from_user_i_d = Entity.GetEntityFromUserID, entity_is_teammate = Entity.IsTeammate, entity_is_enemy = Entity.IsEnemy, entity_is_bot = Entity.IsBot, entity_is_local_player = Entity.IsLocalPlayer, entity_is_valid = Entity.IsValid, entity_is_alive = Entity.IsAlive, entity_is_dormant = Entity.IsDormant, entity_get_class_i_d = Entity.GetClassID, entity_get_class_name = Entity.GetClassName, entity_get_name = Entity.GetName, entity_get_weapon = Entity.GetWeapon, entity_get_weapons = Entity.GetWeapons, entity_get_render_origin = Entity.GetRenderOrigin, entity_get_prop = Entity.GetProp, entity_set_prop = Entity.SetProp, entity_get_hitbox_position = Entity.GetHitboxPosition, entity_get_eye_position = Entity.GetEyePosition, trace_line = Trace.Line, trace_bullet = Trace.Bullet, usercmd_set_movement = UserCMD.SetMovement, usercmd_get_movement = UserCMD.GetMovement, usercmd_set_angles = UserCMD.SetAngles, usercmd_force_jump = UserCMD.ForceJump, usercmd_force_crouch = UserCMD.ForceCrouch, antiaim_get_override = AntiAim.GetOverride, antiaim_set_override = AntiAim.SetOverride, antiaim_set_real_offset = AntiAim.SetRealOffset, antiaim_set_fake_offset = AntiAim.SetFakeOffset, antiaim_set_l_b_y_offset = AntiAim.SetLBYOffset, exploit_get_charge = Exploit.GetCharge, exploit_recharge = Exploit.Recharge, exploit_disable_recharge = Exploit.DisableRecharge, exploit_enable_recharge = Exploit.EnableRecharge, ragebot_override_minimum_damage = Ragebot.OverrideMinimumDamage, ragebot_override_hitchance = Ragebot.OverrideHitchance, ragebot_override_accuracy_boost = Ragebot.OverrideAccuracyBoost, ragebot_override_multipoint_scale = Ragebot.OverrideMultipointScale, ragebot_force_safety = Ragebot.ForceSafety;

//endregion

//region dependencies

//region enums

/**
 * @brief Contains the maximum ammo per clip and the corresponding icon for each and every weapon.
 * @template {string} : {array[number, string]}
 */
const weapon_info = {
    // Pistols
    "glock 18": {clip: 20, icon: "d"},
    "p2000": {clip: 13, icon: "o"},
    "dual berettas": {clip: 30, icon: "b"},
    "p250": {clip: 13, icon: "y"},
    "five seven": {clip: 20, icon: "c"},
    "cz75 auto": {clip: 12, icon: "Q"},
    "usp s": {clip: 12, icon: "P"},
    "desert eagle": {clip: 7, icon: "a"},
    "r8 revolver": {clip: 8, icon: "R"},
    "tec 9": {clip: 18, icon: "w"},

    // Heavys
    "nova": {clip: 8, icon: "B"},
    "xm1014": {clip: 7, icon: "r"},
    "mag 7": {clip: 5, icon: "t"},
    "sawed off": {clip: 7, icon: "v"},
    "negev": {clip: 150, icon: "u"},
    "m249": {clip: 100, icon: "i"},

    // SMGs
    "mp9": {clip: 30, icon: "A"},
    "mp7": {clip: 30, icon: "z"},
    "mp5 sd": {clip: 30, icon: "p"},
    "ump 45": {clip: 25, icon: "q"},
    "p90": {clip: 50, icon: "C"},
    "pp bizon": {clip: 64, icon: "s"},
    "mac 10": {clip: 30, icon: "n"},

    // Rifles
    "ak 47": {clip: 30, icon: "e"},
    "m4a4": {clip: 30, icon: "l"},
    "m4a1 s": {clip: 25, icon: "m"},
    "famas": {clip: 25, icon: "h"},
    "galil ar": {clip: 35, icon: "k"},
    "aug": {clip: 30, icon: "f"},
    "ssg 08": {clip: 10, icon: "F"},
    "sg 553": {clip: 30, icon: "E"},
    "awp": {clip: 10, icon: "g"},
    "scar 20": {clip: 20, icon: "D"},
    "g3sg1": {clip: 20, icon: "j"},

    // Equipment
    "high explosive grenade": {clip: -1, icon: "I"},
    "smoke grenade": {clip: -1, icon: "J"},
    "flashbang": {clip: -1, icon: "H"},
    "decoy grenade": {clip: -1, icon: "L"},
    "molotov": {clip: -1, icon: "K"},
    "incendiary grenade": {clip: -1, icon: "M"},
    "zeus x27": {clip: 1, icon: "x"},
    "c4 explosive": {clip: -1, icon: "N"},

    // Knives
    "m9 bayonet": {clip: -1, icon: "Z"},
    "bayonet": {clip: -1, icon: "V"},
    "flip knife": {clip: -1, icon: "W"},
    "gut knife": {clip: -1, icon: "X"},
    "karambit": {clip: -1, icon: "Y"},
    "butterfly knife": {clip: -1, icon: "3"},
    "falchion knife": {clip: -1, icon: "1"},
    "navaja knife": {clip: -1, icon: "6"},
    "shadow daggers": {clip: -1, icon: "4"},
    "stiletto knife": {clip: -1, icon: "7"},
    "bowie knife": {clip: -1, icon: "2"},
    "huntsman knife": {clip: -1, icon: "0"},
    "talon knife": {clip: -1, icon: "8"},
    "ursus knife": {clip: -1, icon: "5"},
    "classic knife": {clip: -1, icon: "G"},
    "paracord knife": {clip: -1, icon: "G"},
    "survival knife": {clip: -1, icon: "G"},
    "nomad knife": {clip: -1, icon: "G"},
    "skeleton knife": {clip: -1, icon: "G"},
    "knife": {clip: -1, icon: "G"}
};

//endregion

/**
 * @title BetterUI
 * @version 1.0.2
 * @description A better UI system for Onetap
 */

var menu_elements_t = [];
var menu = [];
const menu_spacer = "                                                                                  ";

/**
 * Creates a new menu label
 *
 * @param label {string}
 */
menu.label = function(label)
{
    // Creates the label
    UI.AddLabel(label);
};

/**
 * Creates a new menu element
 *
 * @param func {function}
 * @param name {string}
 * @param label {string},
 * @param properties {array}
 */
menu.call = function(func, name, label, properties)
{
    // If the label isn't unique
    if (label in menu_elements_t)
        throw new Error("[Menu] The label must be unique!");

    // Get properties
    const final_name = name + menu_spacer + label;
    var final_props = [final_name];
    const element_info_t = {
        name: name,
        label: label,
        properties: properties
    };

    // If our properties aren't null, then pack them together.
    if (properties !== null)
    {
        for (var i = 0; i < properties.length; i++)
        {
            final_props.push(properties[i]);
        }
    }

    // Create our menu element and return properties
    func.apply(null, final_props);
    menu_elements_t[label] = element_info_t;
    return label;
};

/**
 * Gets the value of a menu element
 *
 * @param label {string}
 * @return {any}
 */
menu.get = function(label)
{
    // If the label doesn't exist
    if (!(label in menu_elements_t))
        throw new Error("[Menu] This element's label doesn't exist!");

    // Get properties
    const properties = menu_elements_t[label];
    const final_name = properties.name + menu_spacer + properties.label;

    // Returns the element's value
    return UI.GetValue("Misc", "JAVASCRIPT", "Script items", final_name);
};

/**
 * Gets the value of a menu element
 *
 * @param label {string}
 * @return {any}
 */
menu.get_hotkey = function(label)
{
    // If the label doesn't exist
    if (!(label in menu_elements_t))
        throw new Error("[Menu] This element's label doesn't exist!");

    // Get properties
    const properties = menu_elements_t[label];
    const final_name = properties.name + menu_spacer + properties.label;

    // Returns the element's value
    return UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", final_name);
};

/**
 * Gets the value of a menu element
 *
 * @param label {string}
 * @return {any}
 */
menu.get_color = function(label)
{
    // If the label doesn't exist
    if (!(label in menu_elements_t))
        throw new Error("[Menu] This element's label doesn't exist!");

    // Get properties
    const properties = menu_elements_t[label];
    const final_name = properties.name + menu_spacer + properties.label;

    // Returns the element's value
    return UI.GetColor("Misc", "JAVASCRIPT", "Script items", final_name);
};

/**
 * Sets the value of a menu element
 *
 * @param label {string}
 * @param value {any}
 */
menu.set = function(label, value)
{
    // If the label doesn't exist
    if (!(label in menu_elements_t))
        throw new Error("[Menu] This element's label doesn't exist!");

    // Get properties
    const properties = menu_elements_t[label];
    const final_name = properties.name + menu_spacer + properties.label;

    // Set the element's value
    UI.SetValue("Misc", "JAVASCRIPT", "Script items", final_name, value);
};

/**
 * Sets the value of a color picker
 *
 * @param label {string}
 * @param value {any}
 */
menu.set_color = function(label, color)
{
    // If the label doesn't exist
    if (!(label in menu_elements_t))
        throw new Error("[Menu] This element's label doesn't exist!");

    // Get properties
    const properties = menu_elements_t[label];
    const final_name = properties.name + menu_spacer + properties.label;

    // Set the element's value
    UI.SetColor("Misc", "JAVASCRIPT", "Script items", final_name, color);
};

/**
 * Changes the visibility of a menu elements
 *
 * @param label {string}
 * @param visible {boolean}
 */
menu.visibility = function(label, visible)
{
    // If the label doesn't exist
    if (!(label in menu_elements_t))
        throw new Error("[Menu] This element's label doesn't exist!");

    // Get properties
    const properties = menu_elements_t[label];
    const final_name = properties.name + menu_spacer + properties.label;

    // Change the element's visibility
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", final_name, visible);
};

/**
 * @brief Creates a new 3D vector object based on an array
 *
 * @param array {array}
 * @returns {Vector3D}
 */
function vec(array)
{
    // Create the info table
    //
    // struct vector_info_t {
    //    float x;
    //    float y;
    //    float z;
    // }
    //
    const vector_info_t = {
        x: array[0] || 0,
        y: array[1] || 0,
        z: array[2] || 0
    };

    // Return values
    return vector_info_t;
}

/**
 * @brief Performs a addition between two 3D vectors.
 *
 * @param v1 {array|Vector3D}
 * @param v2 {array|Vector3D}
 * @returns {array|Vector3D}
 */
function vec_add(v1, v2)
{
    // Perform the addition and return results
    return {
        x: v1.x + v2.x,
        y: v1.y + v2.y,
        z: v1.z + v2.z
    };
}

/**
 * @brief Creates a new box instance
 *
 * @param  {number} x
 * @param  {number} y
 * @param  {number} x2
 * @param  {number} y2
 * @returns {array|Box}
 */
function box(x, y, x2, y2)
{
    // Create the info table
    //
    // struct box_info_t {
    //    double x;
    //    double y;
    //    double x2;
    //    double y2;
    //    double w;
    //    double h;
    // }
    //
    const box_info_t = {
        x: x,
        y: y,
        x2: x2,
        y2: y2,

        w: x2 - x,
        h: y2 - y
    };

    // Returns values
    return box_info_t;
}

/**
 * @brief Gets the bounding box area and points of an entity
 *
 * @param  {number|EntityID} ent
 * @param {number} padding
 * @returns {array|Box}
 */
function entity_get_box(ent, padding)
{
    // Gets the mins and maxs of our entity
    const origin = vec(entity_get_render_origin(ent));
    const min = vec_add(vec(entity_get_prop(ent, "CBaseEntity", "m_vecMins")), origin);
    const max = vec_add(vec(entity_get_prop(ent, "CBaseEntity", "m_vecMaxs")), origin);

    // Get every single of the 8 points of the player's boundaries
    const points = [
        render_world_to_screen([min.x - padding, min.y - padding, min.z - padding]),
        render_world_to_screen([min.x - padding, max.y + padding, min.z - padding]),
        render_world_to_screen([max.x + padding, max.y + padding, min.z - padding]),
        render_world_to_screen([max.x + padding, min.y - padding, min.z - padding]),
        render_world_to_screen([max.x + padding, max.y + padding, max.z + padding]),
        render_world_to_screen([min.x - padding, max.y + padding, max.z + padding]),
        render_world_to_screen([min.x - padding, min.y - padding, max.z + padding]),
        render_world_to_screen([max.x + padding, min.y - padding, max.z + padding]),
    ];

    // Check if our points are valid
    if (!points[0][0] || !points[0][1] ||
        !points[1][0] || !points[1][1] ||
        !points[2][0] || !points[2][1] ||
        !points[3][0] || !points[3][1] ||
        !points[4][0] || !points[4][1] ||
        !points[5][0] || !points[5][1] ||
        !points[6][0] || !points[6][1] ||
        !points[7][0] || !points[7][1])
        return null;

    // Declare some values...
    var left, right, top, bottom;
    left = right = points[3][0];
    top = bottom = points[3][1];

    // Get the best points to make our box
    for (var i = 0; i < points.length; i++)
    {
        if (left > points[i][0])
            left = points[i][0];

        if (bottom < points[i][1])
            bottom = points[i][1];

        if (right < points[i][0])
            right = points[i][0];

        if (top > points[i][1])
            top = points[i][1];
    }

    // Return the box
    return box(left, top, right, bottom);
}

/**
 * @brief Renders an outlined string with custom font
 *
 * @param  {number} x
 * @param  {number} y
 * @param  {number} align
 * @param  {string} text
 * @param  {array|Color} color
 * @param  {number|Font} font
 */
function render_string_custom_outline(x, y, align, text, color, font)
{
    // Render the outlines
    render_string_custom(x - 1, y - 1, align, text, [15, 15, 15, color[3] * 0.25], font);
    render_string_custom(x + 1, y - 1, align, text, [15, 15, 15, color[3] * 0.25], font);
    render_string_custom(x - 1, y + 1, align, text, [15, 15, 15, color[3] * 0.25], font);
    render_string_custom(x + 1, y + 1, align, text, [15, 15, 15, color[3] * 0.25], font);

    // Render the actual text
    render_string_custom(x, y, align, text, color, font);
}

/**
 * @brief Checks whether or not a point is shown on your screen
 *
 * @param  {number} x
 * @param  {number} y
 */
function point_inside_screen(x, y)
{
    // Get the screen size
    const size = render_get_screen_size();

    // Calculate whether the point is inside our screen or not and return result
    // We're adding half of our screen's width as tolerance since we're dealing
    // With boxes and not points.
    return x > -size[0] * 0.5 && x < size[0] * 1.5 && y > 0 && y < size[1];
}

/**
 * @brief Clamps a value inside two boundaries
 *
 * @param  {number} v
 * @param  {number} floor
 * @param  {number} ceil
 */
function clamp(v, floor, ceil)
{
    // Clamp value and return it
    return Math.max(Math.min(v, ceil), floor);
}

/**
 * @brief Renders an outlined rectangle.
 *
 * @param x {number}
 * @param y {number}
 * @param w {number}
 * @param h {number}
 * @param color {array}
 */
function render_outlined_rect(x, y, w, h, color)
{
    render_rect(x - 1, y - 1, w + 2, h + 2, [25, 25, 25, 75]);
    render_rect(x, y, w, h, color);
    render_rect(x + 1, y + 1, w - 2, h - 2, [25, 25, 25, 75]);
}

/**
 * @brief Renders an outlined rectangle.
 *
 * @param x {number}
 * @param y {number}
 * @param w {number}
 * @param h {number}
 * @param color {array}
 */
function render_outlined_rect_override(x, y, w, h, color)
{
    render_rect(x - 1, y + 2, w + 2, h - 2, [25, 25, 25, 75]);
    render_rect(x, y, w, h, color);
}

//endregion

//region menu

// Create our main switch
const enable = menu.call(ui_add_checkbox, "[k] enable", "kitkat_switch", null);

// Create the modules
const bbox = menu.call(ui_add_dropdown, "[k] bounding box", "kitkat_box", [["Off", "Normal", "Cornered"]]);
const bbox_color = menu.call(ui_add_color_picker, "[k] bounding box color", "kitkat_box_color", null);
const bbox_gradient = menu.call(ui_add_checkbox, "[k] bounding box gradient", "kitkat_box_grad", null);
const name = menu.call(ui_add_checkbox, "[k] name", "kitkat_name", null);
const name_color = menu.call(ui_add_color_picker, "[k] name color", "kitkat_name_color", null);
const health = menu.call(ui_add_checkbox, "[k] health bar", "kitkat_health", null);
const weapon = menu.call(ui_add_multi_dropdown, "[k] weapon", "kitkat_weapon", [["Name", "Icon"]]);
const weapon_name_color = menu.call(ui_add_color_picker, "[k] weapon name color", "kitkat_weapon_name_color", null);
const weapon_icon_color = menu.call(ui_add_color_picker, "[k] weapon icon color", "kitkat_weapon_icon_color", null);
const ammo = menu.call(ui_add_checkbox, "[k] ammo", "kitkat_ammo", null);
const ammo_color = menu.call(ui_add_color_picker, "[k] ammo color", "kitkat_ammo_color", null);
const hitmarker = menu.call(ui_add_checkbox, "[k] screen hitmarker", "kitkat_hitmarker", null);

//endregion

//region functions

/**
 * @class ESP
 *
 * @brief Handles all ESP rendering.
 */
var esp = {
    /*#define*/ hitmarker_alpha: 0, // The rendering alpha for our hitmarker
    /*#define*/ health: [] // The array that contains all of the player's health. Handles the health bar animation.
};

/**
 * @brief Sets an initial value for unitialized colors
 */
/*private function*/ esp.setup_colors = function()
{
    // Create an array containing our color pickers and our desired default colors.
    const defaults = [
        [bbox_color, [255, 255, 255, 200]],
        [name_color, [255, 255, 255, 200]],
        [weapon_name_color, [232, 232, 232, 200]],
        [weapon_icon_color, [200, 200, 200, 200]],
        [ammo_color, [65, 135, 245, 200]]
    ]

    // Loops for each color picker
    for (var i = 0; i < defaults.length; i++)
    {
        // Get our colors
        const color = menu.get_color(defaults[i][0]);
        const def = defaults[i][1];

        // If this color picker doesn't have a color, then set it to the default color.
        if (color[3] === 0)
            menu.set_color(defaults[i][0], def);
    }
}
/**
 * @brief Renders a box around the given entity
 *
 * @param  {number|EntityID} ent
 * @param  {array|Box} box
 */
/*private function*/ esp.box = function(ent, box)
{
    // Get the bounding box's color
    const color = menu.get_color(bbox_color);
    const cornered = menu.get(bbox) === 2;

    // Checks if the box boundaries are visible and valid
    if (point_inside_screen(box.x, 1) && point_inside_screen(box.x2, 1))
    {
        // Render the box's gradient.
        if (menu.get(bbox_gradient))
            render_gradient_rect(box.x + 1, box.y + 1, box.w - 2, box.h - 2, 0, [0, 0, 0, 0], color);

        // Check if our bounding box mode is set to cornered.
        if (cornered)
        {
            const quarter_x = box.w / 4, quarter_y = box.h / 4;

            render_line(box.x, box.y, box.x + quarter_x, box.y, color);
            render_line(box.x + quarter_x * 3, box.y, box.x + quarter_x * 4, box.y, color);
            render_line(box.x, box.y2, box.x + quarter_x, box.y2, color);
            render_line(box.x + quarter_x * 3, box.y2, box.x + quarter_x * 4, box.y2, color);

            render_line(box.x, box.y, box.x, box.y + quarter_y, color);
            render_line(box.x, box.y + quarter_y * 3, box.x, box.y + quarter_y * 4, color);
            render_line(box.x2, box.y, box.x2, box.y + quarter_y, color);
            render_line(box.x2, box.y + quarter_y * 3, box.x2, box.y + quarter_y * 4, color);

            return;
        }

        // Renders the normal bounding box
        render_outlined_rect(box.x, box.y, box.w, box.h, color);
    }
};

/**
 * @brief Renders the name of a given entity
 *
 * @param  {number|EntityID} ent
 * @param  {array|Box} box
 * @param  {number|Font} font
 */
/*private function*/ esp.name = function(ent, box, font)
{
    // Get our drawing properties
    const name = entity_get_name(ent);
    const color = menu.get_color(name_color);

    // Renders the entity's name
    render_string_custom_outline(box.x + (box.w / 2), box.y - 14, 1, name, color, font)
}
/**
 * @brief Renders the health of a given entity
 *
 * @param  {number|EntityID} ent
 * @param  {array|Box} box
 * @param  {number|Font} font
 */
/*private function*/ esp.health = function(ent, box, font)
{
    // Get our drawing properties
    const health = entity_get_prop(ent, "CBasePlayer", "m_iHealth");
    const display_health = this.health[ent];
    const color = [255 - health * 2.55, health * 2.55, 0, 225];

    // Checks if we don't have info regarding the player's health
    if (!this.health[ent])
    {
        // If we don't, then update it.
        this.health[ent] = health;
    }

    // Get the increment we'll be using on the animation
    const inc = 2 * globals_frametime() * 100;

    // If our display health is lower than the player's current health..
    if (display_health < health)
    {
        // ..add to the display health.
        this.health[ent] = clamp(this.health[ent] + inc, 0, health);
        const color = [255 - health * 2.55, health * 2.55, 0, 225];
    }

    // If our display health is greater than the player's current health..
    if (display_health > health)
    {
        // ..subtract from the display health.
        this.health[ent] = clamp(this.health[ent] - inc, health, 100);
    }

    // Draws an 'low health' indicator if the player's health is lower than 4.
    if (health < 4)
    {
        // Render the indicator
        render_string_custom_outline(box.x + (box.w / 2), box.y - 24, 1, "low health", [65, 135, 245, 200], font);
    }

    // Renders the entity's health bar
    render_string_custom_outline(box.x - 22, box.y, 0, health.toString(), [0, 255, 0, 225], font);
    render_filled_rect(box.x - 6, box.y - 1, 4, box.h + 2, [25, 25, 25, 75]);
    render_filled_rect(box.x - 5, box.y + (box.h) - (box.h) * display_health / 100, 2, (box.h) * display_health / 100, color);
}
/**
 * @brief Renders the name of the weapon of a given entity
 *
 * @param  {array|Box} box
 * @param  {number|EntityID} wpn
 * @param  {number|Font} font
 */
/*private function*/ esp.weapon = function(box, wpn, font)
{
    // Get our drawing properties
    const name = entity_get_name(wpn);
    const value = menu.get(weapon);

    // Applies an offet to the Y position if the ammo bar is toggled
    const inc = menu.get(ammo) ? 0 : -6;

    // Checks whether or not we should draw the weapon's name.
    if (value & (1 << 0))
    {
        // Get the specified color
        const name_color = menu.get_color(weapon_name_color);

        // Render weapon's name
        render_string_custom_outline(box.x + (box.w / 2), box.y + box.h + (value & (1 << 1) ? 22 : 8) + inc, 1, name.toUpperCase(), name_color, font);
    }

    // Checks whether or not we should draw the weapon's icon.
    if (value & (1 << 1))
    {
        // Get the specified color
        const icon_color = menu.get_color(weapon_icon_color);

        // Render weapon's icon
        render_string(box.x + (box.w / 2), box.y + box.h + 8 + inc, 1, weapon_info[name].icon, icon_color, 6);
    }
}

/**
 * @brief Renders the remaining ammo of the weapon of a given entity
 *
 * @param  {array|Box} box
 * @param  {number|EntityID} wpn
 */
/*private function*/ esp.ammo = function(box, wpn)
{
    // Get our drawing properties..
    var ammo = entity_get_prop(wpn, "CBaseCombatWeapon", "m_iClip1");
    var clip = weapon_info[entity_get_name(wpn)].clip

    // And drawing color
    const color = menu.get_color(ammo_color)

    // If the given weapon has unlimited or no ammo, then handle it differently.
    if (clip < 0)
        clip = ammo = 1;

    // Render the ammo bar
    render_filled_rect(box.x, box.y + box.h + 2, box.w, 4, [25, 25, 25, 125]);
    render_filled_rect(box.x + 1, box.y + box.h + 3, (box.w - 2) * ammo / clip, 2, color);
}

/**
 * @brief Renders a hitmarker on the center of the screen whenever you hurt another player.
 */
/*private function*/ esp.hitmarker = function()
{
    // Checks whether or not we should draw the hitmarker
    if (this.hitmarker_alpha === 0)
        return;

    // Get our drawing properties
    const x = render_get_screen_size()[0], y = render_get_screen_size()[1];
    const inc = globals_frametime() * 255;

    // Update our hitmarker's alpha
    this.hitmarker_alpha = clamp(this.hitmarker_alpha - inc, 0, 255);

    // Renders the lines in order to form the hitmarker
    render_line(x / 2 - 10, y / 2 - 10, x / 2 - 5, y / 2 - 5, [225, 225, 225, this.hitmarker_alpha]);
    render_line(x / 2 - 10, y / 2 + 10, x / 2 - 5, y / 2 + 5, [225, 225, 225, this.hitmarker_alpha]);
    render_line(x / 2 + 5, y / 2 - 5, x / 2 + 10, y / 2 - 10, [225, 225, 225, this.hitmarker_alpha]);
    render_line(x / 2 + 5, y / 2 + 5, x / 2 + 10, y / 2 + 10, [225, 225, 225, this.hitmarker_alpha]);
}

/**
 * @brief Updates the hitmarker's alpha whenever you hurt another player.
 */
/*private function*/ esp.handle_damage = function()
{
    // Get our entities
    const attacker = entity_get_entity_from_user_i_d(event_get_int("attacker"));
    const userid = entity_get_entity_from_user_i_d(event_get_int("userid"));
    const me = entity_get_local_player();

    // Check if we're the one who attacked and not the one who got hurt.
    if (attacker == me && userid !== me)
    {
        // If so, update the hitmaker's alpha
        this.hitmarker_alpha = 255;
    }
}

/**
 * @brief Renders the plugin's watermark
 *
 * @type fps {number} The cached FPS count
 * @type last_update {number} The timestamp of the last FPS update.
 *
 * @param  {number|Font} font
 */
var fps = 0;
var last_update = 0;
/*private function*/ esp.watermark = function(font)
{
    // Get our drawing info
    const username = cheat_get_username();
    const ping = local_latency();

    // Get the current timestamp
    const now = globals_curtime();

    // Check if we should update the FPS count or not.
    // Doing it every second.
    if (now - last_update > 1)
    {
        // If so, update our FPS count and cache the timestamp for further calculations.
        fps = 1 / globals_frametime();
        last_update = now;
    }

    // Creates our watermark's text
    const text = "";

    // Get more drawing properties
    const x = render_get_screen_size()[0];
    const width = render_text_size_custom(text, font)[0];

    // Renders the watermark
    render_rect(x - 0 - width, 0, width + 0, 0, [0, 0, 0, 0]);
    render_filled_rect(x - 0 - width, 0, 0, 0, [0, 0, 0, 0]);
    render_filled_rect(x - 0 - width, 0, width + 19, 25, [0, 0, 0, 0]);
    render_string_custom(x - 0 - width, 0, 0, text, [0, 0, 0, 0], font);
}

/**
 * @brief Handles all of the ESP rendering.
 */
/*private function*/ esp.do = function()
{
    // Get all of the enemy players.
    const players = entity_get_enemies();

    // Creates our fonts
    const fonts = {
        /*#define*/ watermark: render_add_font("Segoe UI", 0, 0), // The font we'll be using at our watermark
        /*#define*/ name: render_add_font("MuseoSansCyrl-900", 7, 400), // The font we'll be using at our name ESP.
        /*#define*/ hp: render_add_font("MuseoSansCyrl-900", 6, 200), // The font we'll be using at our health ESP.
        /*#define*/ weapon: render_add_font("MuseoSansCyrl-500", 5, 200) // The font we'll be using at our weapon ESP.
    };

    // Renders the watermark
    //
    // DO NOT REMOVE THIS LINE OF CODE.
    // READ DISCLAIMER AT THE TOP OF THE FILE.
    //
    esp.watermark(fonts.watermark);

    // Renders the hitmarkers
    if (menu.get(hitmarker))
        esp.hitmarker();

    // Loops for each enemy player.
    for (var i = 0; i < players.length; i++)
    {
        // Get our current player.
        const ent = players[i];

        // Checks if this player is valid for rendering purposes.
        if (ent && entity_is_alive(ent) && !entity_is_dormant(ent))
        {
            // Get the player's properties
            const box = entity_get_box(ent, 0);
            const wpn = entity_get_weapon(ent);

            // Checks if our rendering position is valid
            if (point_inside_screen(box.x, box.y) && point_inside_screen(box.x2, 1))
            {
                // Renders the player's bounding box
                if (menu.get(bbox))
                    esp.box(ent, box);

                // Renders the player's name
                if (menu.get(name))
                    esp.name(ent, box, fonts.name);

                // Renders the player's health
                if (menu.get(health))
                    esp.health(ent, box, fonts.hp);

                // Renders the player's ammo
                if (menu.get(ammo))
                    esp.ammo(box, wpn);

                // Renders the player's weapon
                if (menu.get(weapon))
                    esp.weapon(box, wpn, fonts.weapon);
            }
        }
    }
}

// Sets up the colors once at the beginning of the code execution.
// Doing this outside any callbacks so we don't override the
// User's colors.
esp.setup_colors();

/**
 * @brief Is called on every frame. Used for rendering.
 */
/*private*/ function on_frame_render()
{
    // Handles and renders our ESP.
    esp.do();
}

/**
 * @brief Is called whenever a player is hurt. Used to handle the hitmarkers.
 */
/*private*/ function on_player_hurt()
{
    // Handles the hitmarkers.
    esp.handle_damage();
}

//endregion

//region callbacks

// Register the callbacks
cheat_register_callback('paint', 'on_frame_render');
cheat_register_callback('player_hurt', 'on_player_hurt');

//endregion

UI.AddLabel("------------Chams------------");

var materials = []

function createMat(name){
    UI.AddColorPicker("Best " + "chams")
    UI.AddCheckbox("Hollow " + "chams")
    UI.AddCheckbox("Pulse " + "chams")
    UI.AddCheckbox("Rainbow " + "chams")
    UI.AddCheckbox("Wireframe " + "chams")
    Material.Create(name + " chams")
    materials.push([name,
         name + " chams",
         "Hollow " + name.toLowerCase() + " chams",
         "Pulse " + name.toLowerCase() + " chams",
         "Rainbow " + name.toLowerCase() + " chams",
         "Wireframe " + name.toLowerCase() + " chams"]);
}
function HSVtoRGB(h,s,v){
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return [
        Math.round(r * 255),
        Math.round(g * 255),
        Math.round(b * 255),
        255
    ]
}
function materialUpdate(){   
    for(i in materials){
        var mat = materials[i]
        var mat_index = Material.Get(mat[0] + " chams")
        if ( mat_index > 0 )
        {
            
            Material.SetKeyValue(mat_index, "$baseTexture", "vgui/white")
            var additive = UI.GetValue("Script items", "Hollow " + mat[0] .toLowerCase() + " chams")
            Material.SetKeyValue(mat_index, "$additive", additive ? "1" : "0")
            Material.SetKeyValue(mat_index, "$envmap", "models/effects/cube_white")
            Material.SetKeyValue(mat_index, "$envmapfresnel", "1")
            
            var uicol = UI.GetColor("Script items", mat[0]  + " chams")
            var pulse = UI.GetValue("Script items", mat[3])
            var rainbow = UI.GetValue("Script items", mat[4])
            if(rainbow){
                uicol = HSVtoRGB(Globals.Realtime() / 5 % 1, 1, 1)
                uicol[0] /= 10
                uicol[1] /= 10
                uicol[2] /= 10
            }
            if(pulse){
                var speed = 7
                var additive = 5
                var intensity = 0.6
                var sine = (Math.sin(Globals.Realtime() * 7) + 5) * intensity
                uicol[0] *= sine
                uicol[1] *= sine
                uicol[2] *= sine
            }
            var wireframe = UI.GetValue("Script items", mat[5])
            Material.SetKeyValue(mat_index, "$wireframe", wireframe ? "1" : "0")
            Material.SetKeyValue(mat_index, "$envmapfresnelminmaxexp", wireframe ? "[0 2 4]" : "[0 1 2]")
            Material.SetKeyValue(mat_index, "$envmaptint", "[" + uicol[0]/255 + " " + uicol[1]/255 + " " + uicol[2]/255 + "]")
            Material.SetKeyValue(mat_index, "$alpha", "1")
            Material.Refresh(mat_index)       
        }
    }
}
createMat("Better glow")
Cheat.RegisterCallback("Material", "materialUpdate")
function onUnload()
{
    for(i in materials)
    {
        Material.Destroy(materials[i][0])
    }
}
Cheat.RegisterCallback("Unload", "onUnload")

UI.AddLabel("---------Bullet Tracer---------");

var traceContainer = [];
function tracer(eyepos, hitpos, time,color) {
    this.eyepos = eyepos
    this.position = hitpos
    this.time = time
    this.col = color
    
}
var impact = 0;
function onBulletImpact() {
    
        if (Entity.GetEntityFromUserID(Event.GetInt("userid")) == Entity.GetLocalPlayer()) {
            var x = Event.GetFloat("x")
            var y = Event.GetFloat("y")
            var z = Event.GetFloat("z")

            var pos = [x, y, z - 1]
            var color = UI.GetColor('Misc', 'JAVASCRIPT', 'Script items', "Tracer color")
            
            var view = Entity.GetEyePosition(Entity.GetLocalPlayer());
             view = [view[0],view[1],view[2] - 1]
            traceContainer.push(new tracer(view, pos, Globals.Tickcount(),color))
        }
        
    
}
function onDraw() {
    if (!(Entity.IsAlive(Entity.GetLocalPlayer())) ) {
        traceContainer = [];
        return
    }
    if(traceContainer.length < 1)
    return    
    var t = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "Ticks tracer lasts")
    for (i in traceContainer) {
        //Cheat.Print("lol")
        var ss = Render.GetScreenSize()
        var view2s = Render.WorldToScreen(traceContainer[i].eyepos)
        var pos2s = Render.WorldToScreen(traceContainer[i].position)
        var col = traceContainer[i].col
        
        
        
            /*
            this is what i did to check for w2s throwing garbage invalid numbers 
            not sure why it considers -20k valid but whatever
            all this check does it check if the number given is too far out of the bounds of the screen size to make sense
            the +- 100 is because small overflows are ok and still end up rendering properly you can probably do more/less 
            but i figured that this much looks ok
            */
            
            if ((view2s[0] < -100 || view2s[0] > ss[0] + 100 || pos2s[0] < -100 || pos2s[0] > ss[0] + 100
                || view2s[1] < -100 || view2s[1] > ss[1] + 100 || pos2s[1] < -100 || pos2s[1] > ss[1] + 100) == false) {
                currenteye = Entity.GetEyePosition(Entity.GetLocalPlayer())
                //pasted from google : ) 
                var dx = currenteye[0] - traceContainer[i].eyepos[0];
                var dy = currenteye[1] - traceContainer[i].eyepos[1];
                var dz = currenteye[2] - traceContainer[i].eyepos[2];

                var dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (UI.IsHotkeyActive("Visual", "WORLD", "View", "Thirdperson") == 0 || dist > 0.3) {
                    //Center main line
                    Render.Line(view2s[0], view2s[1], pos2s[0], pos2s[1], col)

                    if (UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "Type") == 1) {
                        //+1 on width
                        Render.Line(view2s[0] + 1, view2s[1], pos2s[0] + 1, pos2s[1], col)

                        //+1 on height
                        Render.Line(view2s[0], view2s[1] + 1, pos2s[0], pos2s[1] + 1, col)

                        //-1 on width
                        Render.Line(view2s[0] - 1, view2s[1], pos2s[0] - 1, pos2s[1], col)

                        //-1 on height
                        Render.Line(view2s[0], view2s[1] - 1, pos2s[0], pos2s[1] - 1, col)
                    }
                }
            }
        
            
               
               
        if (traceContainer[i].time + t < Globals.Tickcount()) {
            traceContainer[i].col = [traceContainer[i].col[0],traceContainer[i].col[1],traceContainer[i].col[2],clamp(traceContainer[i].col[3] - 2.5,0,255)]
        }
        
        if(traceContainer[i].col[3] <= 15){
            traceContainer.shift()
        }

        if (UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "Max tracers") < traceContainer.length) {
            traceContainer[i].col = [traceContainer[i].col[0],traceContainer[i].col[1],traceContainer[i].col[2],clamp(traceContainer[i].col[3] - 2.5,0,255)]
        }
    }
}

clamp = function (val, min, max) {
    if (val > max)
       return max
    if (min > val)
       return min
    return val
 }
function menu_cb()
{   
    if (!UI.IsMenuOpen())
    return
   enabled = UI.GetValue( "Local Bullets");
   UI.SetEnabled( "Tracer color", enabled);
   UI.SetEnabled( "Ticks tracer lasts", enabled);
   UI.SetEnabled( "Max tracers", enabled);
   UI.SetEnabled( "Type", enabled);
}

UI.AddCheckbox("Local Bullets")
UI.AddColorPicker("Tracer color")
UI.AddSliderInt("Ticks tracer lasts", 1, 640)
UI.AddSliderInt("Max tracers", 1, 50)
UI.AddDropdown("Type", ["Thin", "Thick"])
UI.AddLabel(" ");
Cheat.RegisterCallback("Draw", "onDraw")
Cheat.RegisterCallback("bullet_impact", "onBulletImpact")
Global.RegisterCallback("Draw", "menu_cb")