<?php

namespace App\Http\Controllers\Forms;

use App\Http\Controllers\Controller;
use App\Models\Forms\Form;
use App\Models\User;
use Illuminate\Http\Request;

class FormShareController extends Controller
{
    public function index(Form $form)
    {
        $this->authorize('view', $form);

        return $form->sharedWithUsers;
    }

    public function share(Request $request, Form $form)
    {
        $this->authorize('update', $form);

        $request->validate([
            'user_id' => 'required|exists:users,id',
            'permission' => 'required|in:view,edit',
        ]);

        $user = User::find($request->user_id);

        $form->sharedWithUsers()->syncWithoutDetaching([
            $user->id => ['permission' => $request->permission],
        ]);

        return response()->json(['message' => 'Form shared successfully.']);
    }

    public function update(Request $request, Form $form, User $user)
    {
        $this->authorize('update', $form);

        $request->validate([
            'permission' => 'required|in:view,edit',
        ]);

        $form->sharedWithUsers()->updateExistingPivot($user->id, [
            'permission' => $request->permission,
        ]);

        return response()->json(['message' => 'Permission updated successfully.']);
    }

    public function destroy(Form $form, User $user)
    {
        $this->authorize('update', $form);

        $form->sharedWithUsers()->detach($user->id);

        return response()->json(['message' => 'User removed from form successfully.']);
    }
}
