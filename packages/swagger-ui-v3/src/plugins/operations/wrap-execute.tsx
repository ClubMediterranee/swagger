import { Button } from "@clubmed/trident-ui/molecules/Buttons/Button";

export function wrapExecute(
  Base: React.ComponentClass<{
    disabled: boolean;
  }>
) {
  return class Execute extends Base {
    render() {
      const { disabled } = this.props;
      return (
        <Button className="block w-full" onClick={(this as any).onClick} disabled={disabled}>
          Execute
        </Button>
      );
    }
  };
}
