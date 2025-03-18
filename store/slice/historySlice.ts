import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HistoryItem {
  batchCode: string;
  datetime: string;
}

interface AuthState {
  history: HistoryItem[];
}

const initialState: AuthState = {
  history: [],
};

const HistorySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addHistory: (state, action: PayloadAction<{ batchCode: string }>) => {
      // Xóa batchCode cũ nếu đã tồn tại
      state.history = state.history.filter(item => item.batchCode !== String(action.payload.batchCode));

      // Tạo entry mới
      const newEntry = {
        batchCode: String(action.payload.batchCode),
        datetime: new Date().toISOString(),
      };

      // Thêm vào đầu danh sách
      state.history.unshift(newEntry);

      // Giới hạn tối đa 50 phần tử
      state.history = state.history.slice(0, 50);
    },
    clearHistory: (state) => {
      state.history = [];
    },
  },
});

export const { addHistory, clearHistory } = HistorySlice.actions;
export default HistorySlice.reducer;

