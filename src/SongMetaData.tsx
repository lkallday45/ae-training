type SongMetadataProps = {
  email: string;
  date: string;
  action: "Created" | "Updated";
};

export function SongMetaData({ email, date, action }: SongMetadataProps) {
  return (
    <p className="text-gray-700 text-base p-2">
      {action}: {date} by{" "}
      <a className="hover:underline" href={`mailto: ${email}`}>
        {email}
      </a>
    </p>
  );
}
