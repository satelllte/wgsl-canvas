export const WGSLCanvasShaderVertex = /* wgsl */ `
struct VertexInput {
  @builtin(vertex_index) vertex_index: u32,
}

struct VertexOutput {
  @builtin(position) position: vec4<f32>,
  @location(0) coord: vec2<f32>,
}

@vertex
fn vertex_main(input: VertexInput) -> VertexOutput {
  var output: VertexOutput;
  var vertices = array<vec2<f32>, 3>(
    // https://webgpufundamentals.org/webgpu/lessons/webgpu-large-triangle-to-cover-clip-space.html
    vec2<f32>(-1.0, -1.0),
    vec2<f32>( 3.0, -1.0),
    vec2<f32>(-1.0,  3.0),
  );
  output.coord = vertices[input.vertex_index];
  output.position = vec4<f32>(output.coord, 0.0, 1.0);
  return output;
}
`;
