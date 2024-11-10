struct FragmentOutput {
  @location(0) color: vec4<f32>,
}

@fragment
fn fragment_main() -> FragmentOutput {
  var output: FragmentOutput;
  output.color = vec4<f32>(0.1, 0.2, 0.25, 1.0);
  return output;
}
