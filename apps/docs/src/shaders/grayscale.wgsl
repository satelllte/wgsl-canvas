@group(0) @binding(0) var texture_sampler: sampler;
@group(0) @binding(1) var texture: texture_2d<f32>;

struct FragmentInput {
  @location(0) coord: vec2<f32>,
}

struct FragmentOutput {
  @location(0) color: vec4<f32>,
}

@fragment
fn fragment_main(input: FragmentInput) -> FragmentOutput {
  var output: FragmentOutput;
  var uv: vec2<f32> = input.coord * 0.5 + 0.5;
  let color = textureSample(texture, texture_sampler, uv);
  let gray = dot(color.rgb, vec3<f32>(0.299, 0.587, 0.114));
  output.color = vec4<f32>(gray, gray, gray, color.a);
  return output;
}
