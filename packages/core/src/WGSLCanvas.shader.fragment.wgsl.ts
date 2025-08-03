export const WGSLCanvasShaderFragment = /* wgsl */ `
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
  output.color = vec4<f32>(uv, 0.0, 1.0);
  return output;
}
`;
