@group(0) @binding(0) var<uniform> uniforms: Uniforms;

struct Uniforms {
  time: f32,
  color1: vec3<f32>,
  color2: vec3<f32>,
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
  var blend: f32 = sin(uniforms.time) * 0.5 + 0.5;
  var color: vec3<f32> = mix(uniforms.color1, uniforms.color2, blend);
  output.color = vec4<f32>(color, 1.0);
  return output;
}
