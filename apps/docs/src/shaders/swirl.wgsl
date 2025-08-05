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

fn rotate_2d(pos: vec2<f32>, angle: f32) -> vec2<f32> {
  let sin_a = sin(angle);
  let cos_a = cos(angle);
  return pos * mat2x2<f32>(cos_a, -sin_a, sin_a, cos_a);
}

fn swirl(uv: vec2<f32>, time: f32) -> vec2<f32> {
  let center = vec2<f32>(0.5, 0.5);
  let dist = uv - center;
  let len = length(dist);
  let angle = time * 0.5 + len * 10.0;
  let rotation = rotate_2d(dist, angle);
  let fade = 1.0 - smoothstep(0.0, 0.5, len);
  return center + rotation * fade;
}

@fragment
fn fragment_main(input: FragmentInput) -> FragmentOutput {
  var output: FragmentOutput;
  let uv: vec2<f32> = input.coord * 0.5 + 0.5;
  let uvd = swirl(uv, uniforms.time);
  output.color = textureSample(texture, texture_sampler, uvd);
  return output;
}
