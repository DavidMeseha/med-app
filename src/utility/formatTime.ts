export function formatTime(date: Date) {
  let today = new Date();

  let def: number = today.getTime() - new Date(date).getTime();
  def = Math.floor(def / 1000);
  let display = def + " secs ago";

  if (def >= 60) {
    def = Math.floor(def / 60);
    display = def + " mins ago";
  }
  if (def >= 60) {
    def = Math.floor(def / 60);
    display = def + " hrs ago";
  }
  if (def >= 24) {
    def = Math.floor(def / 24);
    display = def + " days ago";
  }
  if (def >= 31) {
    def = Math.floor(def / 31);
    display = def + " months ago";
  }

  return display;
}
