/*
freestanding for legit aa js
recommended point distance: 22
made with love by dummy
*/
function setup( ) {
    UI.AddCheckbox( "Freestanding Legit Anti-Aim" );
    UI.AddSliderInt( "Point distance", 1, 58 ); // I highly recommend using 22 as your point distance - alex
    UI.AddColorPicker( "Distance color" );
    UI.AddColorPicker( "Line color" );
    Global.Print( "\nloaded dummy#3020's freestanding legit aa\n" );
}
var inverter = {
    get: function( ) { return UI.IsHotkeyActive( "Anti-Aim", "Legit Anti-Aim", "Inverter" ) },
    reverse: function( ) { return UI.ToggleHotkey( "Anti-Aim", "Legit Anti-Aim", "Inverter" ) }
}
function deg2rad( degress ) {
    return degress * Math.PI / 180.0;
}
function angle_to_vec( pitch, yaw ) {
    var p = deg2rad( pitch );
    var y = deg2rad( yaw )
    var sin_p = Math.sin( p );
    var cos_p = Math.cos( p );
    var sin_y = Math.sin( y );
    var cos_y = Math.cos( y );
    return [ cos_p * cos_y, cos_p * sin_y, -sin_p ];
}
function trace( entity_id, entity_angles ) { // pasted from kseny aimlines ;)
    var entity_vec = angle_to_vec( entity_angles[0], entity_angles[1] );
    var entity_pos = Entity.GetRenderOrigin( entity_id );
    entity_pos[2] += 50;
    var stop = [ entity_pos[ 0 ] + entity_vec[0] * 8192, entity_pos[1] + entity_vec[1] * 8192, ( entity_pos[2] )  + entity_vec[2] * 8192 ];
    var traceResult = Trace.Line( entity_id, entity_pos, stop );
    if( traceResult[1] == 1.0 )
        return;
    stop = [ entity_pos[ 0 ] + entity_vec[0] * traceResult[1] * 8192, entity_pos[1] + entity_vec[1] * traceResult[1] * 8192, entity_pos[2] + entity_vec[2] * traceResult[1] * 8192 ];
    var distance = Math.sqrt( ( entity_pos[0] - stop[0] ) * ( entity_pos[0] - stop[0] ) + ( entity_pos[1] - stop[1] ) * ( entity_pos[1] - stop[1] ) + ( entity_pos[2] - stop[2] ) * ( entity_pos[2] - stop[2] ) );
    entity_pos = Render.WorldToScreen( entity_pos );
    stop = Render.WorldToScreen( stop );
    if( stop[2] != 1 || entity_pos[2] != 1 )
        return;
    if ( UI.IsHotkeyActive( "Visuals", "World", "View", "Thirdperson" ) ) {
        Render.Line( entity_pos[0], entity_pos[1], stop[0], stop[1], UI.GetColor( "Script items", "Line color" ) );
        boo = '' + distance;
        Render.String( stop[0], stop[1], 0, boo, UI.GetColor( "Script items", "Distance color" ) );
    }

    return distance;
}
function on_draw( ) {
    var local = Entity.GetLocalPlayer( );
    if ( !Entity.IsAlive( local ) || !UI.GetValue( "MISC", "JAVASCRIPT", "Script Items", "Freestanding Legit Anti-Aim" ) )
        return;

    if ( Entity.IsValid( local ) ) {
        var screen_pos;
        var eye_angles = Entity.GetProp( local, "CCSPlayer", "m_angEyeAngles" );
        left_distance = trace( local, [ 0, eye_angles[1] - UI.GetValue( "MISC", "JAVASCRIPT", "Script Items", "Point distance" ) ] );
        right_distance = trace( local, [ 0, eye_angles[1] + UI.GetValue( "MISC", "JAVASCRIPT", "Script Items", "Point distance" ) ] );
 
        if ( left_distance < right_distance ) {
            if ( inverter.get( ) )
                inverter.reverse( );
        }
        if ( right_distance < left_distance ) {
            if ( !inverter.get( ) )
                inverter.reverse( );
        }
    }
}
Global.RegisterCallback("Draw", "on_draw");
setup( );