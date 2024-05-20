import * as React from "react";
import { Slider } from "./ui/slider";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

function formatTime(time: number) {
  const date = new Date(time);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

function HeatmapControl(props: any) {
  const { startTime, endTime, onChangeTime, allDays, onChangeAllDays, selectedTime } = props;
  const day = 24 * 60 * 60 * 1000;
  const days = Math.round((endTime - startTime) / day);
  const selectedDay = Math.round((selectedTime - startTime) / day);

  const onSelectDay = (evt: any) => {
    const daysToAdd = evt.target.value;
    // add selected days to start time to calculate new time
    const newTime = startTime + daysToAdd * day;
    onChangeTime(newTime);
  };

  console.log("Selected Day:", selectedDay);
  console.log("Total Days:", days);

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Heatmap</CardTitle>
        <CardDescription>
          Map showing earthquakes
          <br />
          from <b>{formatTime(startTime)}</b> to <b>{formatTime(endTime)}</b>.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 my-4">
          <div className="flex items-center gap-2">
            <Label>All Days</Label>
            <Checkbox checked={allDays} onCheckedChange={(checked) => onChangeAllDays(checked)} />
          </div>
          <div className="flex flex-col gap-4">
            <Label>Each Day: {formatTime(selectedTime)}</Label>
            <Slider
              className={`${allDays ? "opacity-50" : ""}`}
              disabled={allDays}
              min={1}
              max={days}
              value={[selectedDay]}
              step={1}
              onValueChange={(value) => onSelectDay({ target: { value: value[0] } })}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default React.memo(HeatmapControl);
