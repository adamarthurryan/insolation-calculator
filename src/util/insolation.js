
//The elecromagnetic flux density of the sun at 1 AU in kW/m^2
export let SOLAR_CONSTANT = 1.362

//all parameters are angles in radians
// azimuth and orientation are from south towards west
// altitude is from the horizon
// orientation is the direction at right angles to the leading edge of the panel 
// inclination is around the leading edge of the panel
// tilt is around the left edge of the panel   
export default function insolation(sun, panel) {



  //1. convert sun altitude and azimuth into a solar normal vector
  let sunNormal = Vector.j

  //incline the sun
  sunNormal = sunNormal.rotate(Math.PI/2-sun.altitude, Line.X)


  //incline the sun
  sunNormal = sunNormal.rotate(sun.azimuth, Line.Y)


  //2. convert panel orientation, inclination and tilt into a panel  normal vector
  let panelNormal = Vector.j

  panelNormal = panelNormal.rotate(panel.tilt, Line.Z)
  panelNormal = panelNormal.rotate(panel.inclination, Line.X)
  panelNormal = panelNormal.rotate(panel.orientation, Line.Y)


  //3. find the angle between the panel and sun normals
  let theta = panelNormal.angleFrom(sunNormal)


  //4. 
  //insolation = S * (R0/Rr) * cos(theta) / m^2
  // where R0 is the perihelion earth-sun distance and Rr is the current earth-sun distance
  // here this ratio is approximated to 1 for a circular orbit
  // the actual ratio varies between 0.9 and 1
  return Math.max(SOLAR_CONSTANT * Math.cos(theta), 0)

  //eg. the insolation of the level ground is 
  // S * cos(Z) / m^2, where Z is the zenith angle of the sun (90 deg - sun altitude)
}


