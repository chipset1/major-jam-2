export function drawBottomTextPanel(p, str, args){
  let padding = 16,
      x = args.x ? args.x : padding,
      width = args.width ? args.width : p.width - (padding * 2),
      height = 128,
      y = p.height - height - padding;
  p.rect(x, y, width, height);
  p.push();
  p.textSize(32);
  p.text(str, x, y + 32);
  p.pop();
}