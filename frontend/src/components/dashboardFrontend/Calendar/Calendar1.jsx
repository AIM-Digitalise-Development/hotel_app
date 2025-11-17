import 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export default function BasicDateCalendar() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="w-72 h-64 p-4 bg-gradient-to-r from-[#e0e2dc] to-[#c7d5e0] rounded-2xl shadow-2xl transition-all transform">
        <DateCalendar
          className="transform scale-75 translate-x-[-60px] translate-y-[-50px]"
          sx={{
            width: '400px', // Set a custom width for the DateCalendar
            height: '400px', // Set a custom height for the DateCalendar
          }}
        />
      </div>
    </LocalizationProvider>
  );
}
