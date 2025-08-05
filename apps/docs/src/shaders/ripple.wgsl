@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var texture_sampler: sampler;
@group(0) @binding(2) var texture: texture_2d<f32>;

struct Uniforms {
  time: f32,
}

struct FragmentInput {
  @location(0) coord: vec2<f32>,
}

struct FragmentOutput {
  @location(0) color: vec4<f32>,
}

fn ripple(uv: vec2<f32>, time: f32) -> vec2<f32> {
  let center = vec2<f32>(0.5, 0.5);
  let dist = uv - center;
  let len = length(dist);
  let ripple = 0.03 * sin(30.0 * len - time * 4.0);
  return uv + dist / len * ripple;
}

@fragment
fn fragment_main(input: FragmentInput) -> FragmentOutput {
  var output: FragmentOutput;
  let uv: vec2<f32> = input.coord * 0.5 + 0.5;
  let uvd = ripple(uv, uniforms.time);
  output.color = textureSample(texture, texture_sampler, uvd);
  return output;
}
