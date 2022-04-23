<?php

namespace App\Http\Controllers;

use App\Models\RecordHistory;
use Illuminate\Http\Request;

class RecordHistoryController extends Controller
{
    public function index()
    {
        return response()->json([
            'recordHistories' => session('user')->recordHistories,
        ]);
    }


    public function store(Request $request)
    {
        $recordHistory = new RecordHistory();
        try {
            $request->validate([
                'characterCount' => 'required|numeric',
                'wordCount' => 'required|numeric',
                'inputString' => 'required',
                'detectedLanguages' => 'required'
            ]);
            $recordHistory->character_count = $request->input('characterCount');
            $recordHistory->word_count = $request->input('wordCount');
            $recordHistory->input_string = $request->input('inputString');
            $recordHistory->detected_languages = $request->input('detectedLanguages');
            $recordHistory->user_id = session("user")->id;

            $recordHistory->save();
            return response()->json([
                'created' => true,
                'recordHistory' => $recordHistory
            ]);
        } catch (\Exception $error) {
            return response()->json([
                'created' => false,
                'error' => $error->getMessage()
            ]);
        }
    }
}
