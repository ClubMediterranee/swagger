import {Button} from "@clubmed/ui/molecules/Buttons";

export function wrapExecute(Base: React.ComponentClass<{
  disabled: boolean
}>) {
  return class Execute extends Base {
    render() {
      const {disabled} = this.props;
      return (
        <Button className="block w-full" onClick={(this as any).onClick} isDisabled={disabled}>
          Execute
        </Button>
      );
    }
  };
}
