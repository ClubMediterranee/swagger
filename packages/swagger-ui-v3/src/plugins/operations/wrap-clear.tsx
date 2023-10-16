import {Button} from "@clubmed/ui/molecules/Buttons";

export function wrapClear(Base: React.ComponentClass<{
  disabled: boolean
}>) {
  return class Execute extends Base {
    render() {
      const {disabled} = this.props;
      return (
        <Button className="block w-full mt-12" onClick={(this as any).onClick} theme="blackStroke">
          Clear
        </Button>

      );
    }
  };
}
