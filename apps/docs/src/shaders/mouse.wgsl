@group(0) @binding(0) var<uniform> uniforms: Uniforms;

struct Uniforms {
  mouse: vec2<f32>,
  time: f32,
}

struct FragmentInput {
  @location(0) coord: vec2<f32>,
}

struct FragmentOutput {
  @location(0) color: vec4<f32>,
}

@fragment
fn fragment_main(input: FragmentInput) -> FragmentOutput {
  var output: FragmentOutput;
  let uv: vec2<f32> = input.coord * 0.5 + 0.5;
  let center = vec2<f32>(uniforms.mouse.x, 1.0 - uniforms.mouse.y);
  let radius = 0.2 + 0.1 * sin(uniforms.time + uv.x * 4.0 + uv.y * 4.0);
  let dist_blob = distance(uv, center);
  let dist_mouse = distance(vec2<f32>(0.5), vec2<f32>(uniforms.mouse.x, 1.0 - uniforms.mouse.y));
  let edge = 0.04 + dist_mouse * 0.5 + 0.01 * sin(uniforms.time + uv.x * 12.5 + uv.y * 12.5);
  let edge_mask = smoothstep(radius - edge, radius - edge * 0.5, dist_blob) - smoothstep(radius, radius + edge * 0.5, dist_blob);
  let color = mix(vec3<f32>(0.2), vec3<f32>(0.8), edge_mask);
  output.color = vec4<f32>(color, 1.0);
  return output;
}
