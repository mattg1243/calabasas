export default function DashRow(props: { beat: any }): JSX.Element {
  const beat = props.beat;

  return <>`[ Beat Row: {beat} ]`</>;
}
