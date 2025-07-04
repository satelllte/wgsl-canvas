@group(0) @binding(0) var<uniform> uniforms: Uniforms;

struct Uniforms {
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
  var xy: vec2<f32> = input.coord.xy * 0.5 + 0.5;
  var blend: f32 = noise(xy);
  output.color = vec4<f32>(vec3<f32>(blend), 1.0);
  return output;
}

fn noise(xy: vec2<f32>) -> f32 {
  return fract(sin(dot(xy, vec2<f32>(12.9898, 78.233))) * 1567.5453 * uniforms.time);
}
