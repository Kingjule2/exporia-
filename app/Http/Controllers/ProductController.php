<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Inertia\Inertia;
use App\Http\Resources\ProductListResource;
use App\Http\Resources\ProductResource;

class ProductController extends Controller
{
    public function Home(Request $request)
    {
        $query = Product::query()
            ->with(['user', 'departemen', 'category'])
            ->published();

        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('departemen_id')) {
            $query->where('departemen_id', $request->departemen_id);
        }

        $products = $query->paginate(12)->withQueryString();

        return Inertia::render('Home', [
            'products' => ProductListResource::collection($products),
            'departemens' => \App\Models\Departemen::all(),
            'filters' => $request->only(['search', 'departemen_id'])
        ]);
    }


    public function show(Product $product)
    {
        return Inertia::render('Product/Show', [
            'product' => new ProductResource($product),
            'variationOptions' => \request('options', [])
        ]);
    }
}
